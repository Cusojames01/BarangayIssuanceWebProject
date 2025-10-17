import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import '../CssComponents/UserManagement.css';

function UserManagement() {
  const [user, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [approvalMessage, setApprovalMessage] = useState('');
  const [modalType, setModalType] = useState(''); 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/users');
        setUsers(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUsers();
  }, []);

  const handleView = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  const handleStatusChange = async (id, status) => {
    try {
      await axios.patch(`http://127.0.0.1:8000/api/users/${id}/status`, { status });
      setUsers(user.map(u => u.id === id ? { ...u, status } : u));

      // find user and show modal
      const updatedUser = user.find(u => u.id === id);
      setApprovalMessage(`${updatedUser.fullname}'s registration has been ${status}.`);
      setModalType(status); // ✅ approved or rejected
      setShowApprovalModal(true);
    } catch (err) {
      console.error(err);
    }
  };

  const closeApprovalModal = () => {
    setShowApprovalModal(false);
    setApprovalMessage('');
  };

  return (
    <div>
      <div className='sidebar'>
        <NavLink to={'/dashboard'}>DashBoard</NavLink>
        <NavLink to={'/user_management'}>User Management</NavLink>
        <NavLink to={'/document_management'}>Document Management</NavLink>
      </div>

      <div className='table-container'></div>

      <table className='table'>
        <thead>
          <tr>
            <th>User ID</th>
            <th>FullName</th>
            <th>Sex</th>
            <th>Address</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {user.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.fullname}</td>
              <td>{u.sex}</td>
              <td>{u.address}</td>
              <td>{u.email}</td>
             <td>
  <span
    className={`status-badge ${
      u.status === 'approved'
        ? 'approved'
        : u.status === 'rejected'
        ? 'rejected'
        : 'pending'
    }`}
  >
    {u.status}
  </span>
</td>
              <td>
                <button className="view-btn" onClick={() => handleView(u)}>View</button>
                <button className="approve-btn" onClick={() => handleStatusChange(u.id, 'approved')}>Approve</button>
                <button className="reject-btn" onClick={() => handleStatusChange(u.id, 'rejected')}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* View Modal */}
      {showModal && selectedUser && (
        <div className="user-modal-overlay">
          <div className="user-modal">
            {selectedUser.personal_picture && (
              <img src={`http://127.0.0.1:8000/storage/${selectedUser.personal_picture}`} alt="Profile" className="profile-pic"/>
            )}
            <h2>{selectedUser.fullname}</h2>
            <div className='user-details'>
              <p><strong>Email:</strong> {selectedUser.email}</p>
              <p><strong>Address:</strong> {selectedUser.address}</p>
              <p><strong>Contact:</strong> {selectedUser.contact_number}</p>
              <p><strong>Sex:</strong> {selectedUser.sex}</p>
              <p><strong>Date of Birth:</strong> {selectedUser.birthdate?.substring(0, 10)}</p>
              <p><strong>Civil Status:</strong> {selectedUser.civil_status}</p>
            </div>
            {selectedUser.valid_id_front && (
              <img src={`http://127.0.0.1:8000/storage/${selectedUser.valid_id_front}`} alt="ID Front" className="id-pic"/>
            )}
            {selectedUser.valid_id_back && (
              <img src={`http://127.0.0.1:8000/storage/${selectedUser.valid_id_back}`} alt="ID Back" className="id-pic"/>
            )}
            <button className="close-button" onClick={handleClose}>Close</button>
          </div>
        </div>
      )}

      {/*  Approval/Reject Modal */}
      {showApprovalModal && (
        <div className="approval-modal-overlay">
          <div className={`approval-modal ${modalType}`}>
            {modalType === 'approved' ? (
              <h3> {approvalMessage}</h3>
            ) : (
              <h3> {approvalMessage}</h3>
            )}
            <button className="close-button" onClick={closeApprovalModal}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserManagement;