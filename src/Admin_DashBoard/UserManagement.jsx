import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import '../CssComponents/UserManagement.css';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import CancelIcon from '@mui/icons-material/Cancel';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import SearchIcon from '@mui/icons-material/Search';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { FaEye, FaEyeSlash } from "react-icons/fa";
function UserManagement() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackType, setFeedbackType] = useState('success'); // 'success' | 'error'
  const [searchTerm, setSearchTerm] = useState("");
    const [showPassword, setShowPassword] = useState(false);
// Add User Modal States
const [showAddUserModal, setShowAddUserModal] = useState(false);
const [newUser, setNewUser] = useState({
  fullname: "",
  sex: "",
  birthdate: "",
  civil_status: "",
  contact_number: "",
  email: "",
  address: "",
  password: "",
});
const [newFiles, setNewFiles] = useState({
  personal_picture: null,
  valid_id_front: null,
  valid_id_back: null,
});
const handleNewUserChange = (e) => {
  const { name, value } = e.target;
  setNewUser({ ...newUser, [name]: value });
};

const handleNewFileChange = (e) => {
  const { name, files } = e.target;
  if (files && files[0]) {
    setNewFiles({ ...newFiles, [name]: files[0] });
  }
};

const handleRemoveNewFile = (name) => {
  setNewFiles((prev) => ({ ...prev, [name]: null }));
};
const handleAddUser = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  Object.entries(newUser).forEach(([key, value]) => formData.append(key, value));
  Object.entries(newFiles).forEach(([key, value]) => value && formData.append(key, value));

  try {
    const res = await axios.post("http://127.0.0.1:8000/api/auth/register", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    // Update UI
    setUsers((prev) => [...prev, res.data.user]);
    setShowAddUserModal(false);
    showFeedback("New user added successfully!", "success");

    // Clear form
    setNewUser({
      fullname: "",
      sex: "",
      birthdate: "",
      civil_status: "",
      contact_number: "",
      email: "",
      address: "",
      password: "",
    });
    setNewFiles({ personal_picture: null, valid_id_front: null, valid_id_back: null });

  } catch (err) {
    console.error("Error adding user:", err);
    showFeedback("Failed to add user. Check your fields.", "error");
  }
};


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/users');
        const filteredUsers = res.data.filter(u => u.role !== 'admin');
        setUsers(filteredUsers);
      } catch (err) {
        console.error(err);
        showFeedback('Failed to fetch users.', 'error');
      }
    };
    fetchUsers();
  }, []);

  const showFeedback = (message, type = 'success') => {
    setFeedbackMessage(message);
    setFeedbackType(type);
    setShowFeedbackModal(true);
  };

  const closeFeedbackModal = () => {
    setShowFeedbackModal(false);
    setFeedbackMessage('');
  };

  const handleView = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  const toggleEditMode = (mode) => {
    setSelectedUser({ ...selectedUser, editMode: mode });
  };

  const handleEditChange = (e, field) => {
    setSelectedUser({ ...selectedUser, [field]: e.target.value });
  };

  // ✅ Updated: Replace alert() with modal feedback
  const handleSaveChanges = async () => {
    try {
      const updateData = {
        fullname: selectedUser.fullname,
        sex: selectedUser.sex,
        birthdate: selectedUser.birthdate,
        civil_status: selectedUser.civil_status,
        contact_number: selectedUser.contact_number,
        email: selectedUser.email,
        address: selectedUser.address,
      };

      await axios.put(`http://127.0.0.1:8000/api/users/${selectedUser.user_id}`, updateData);


      setUsers(prev =>
        prev.map(u => u.user_id === selectedUser.user_id ? { ...u, ...updateData } : u)
      );

      toggleEditMode(false);
      showFeedback('User information updated successfully!', 'success');
    } catch (error) {
      console.error("Error updating user:", error);
      showFeedback('Failed to update user data.', 'error');
    }
  };

  const handleStatusChange = async (user_id, status) => {
  try {
    const res = await axios.patch(`http://127.0.0.1:8000/api/users/${user_id}/status`, { status });

    const updatedUser = res.data.user;
    setUsers(prev =>
      prev.map(u => (u.user_id === user_id ? updatedUser : u))
    );

    showFeedback(`${updatedUser.fullname}'s registration has been ${updatedUser.status}.`, 'success');
  } catch (err) {
    console.error("Error changing status:", err.response?.data || err.message);
    showFeedback('Failed to update user status.', 'error');
  }
};
// Sa loob ng component bago ang return()
const totalUsers = users.length;
const pendingCount = users.filter(u => u.status === 'pending').length;
const approvedCount = users.filter(u => u.status === 'approved').length;
const rejectedCount = users.filter(u => u.status === 'rejected').length;

  return (
    <>




    <div>
      {/* SIDEBAR */}
      <div className='sidebar'>
        <NavLink to={'/dashboard'}  className={({ isActive }) => isActive ? "active-sidebar" : "" } >Dashboard</NavLink>
      <NavLink
  to="/user_management"
  className={({ isActive }) =>
    isActive ? "sidebar-link active-sidebar" : "sidebar-link"
  }
>
  User Management
</NavLink>
        <NavLink to={'/document_management'}  className={({ isActive }) => isActive ? "active-sidebar" : "" }>Document Management</NavLink>
      </div>
<div className="search-container">
 



{showAddUserModal && (
  <div className="modal-overlay">
    <div className="add-user-modal-vertical">
      <h2 className="modal-title">Add New User</h2>

      <form onSubmit={handleAddUser}>
        {/* Full Name */}
        <div className="input-group">
          <label>Full Name <span style={{ color: newUser.fullname ? 'blue' : 'red' }}>*</span></label>
          <input type="text" name="fullname" placeholder="Full Name" value={newUser.fullname} onChange={handleNewUserChange} required />
        </div>

        {/* Date of Birth */}
        <div className="input-group">
          <label>Date Of Birth <span style={{ color: newUser.birthdate ? 'blue' : 'red' }}>*</span></label>
          <input type="date" name="birthdate" value={newUser.birthdate} onChange={handleNewUserChange} required />
        </div>

        {/* Sex */}
        <div className="input-group">
          <label>Sex <span style={{ color: newUser.sex ? 'blue' : 'red' }}>*</span></label>
          <select name="sex" value={newUser.sex} onChange={handleNewUserChange} required>
            <option value="" disabled>-- Select Gender --</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        {/* Civil Status */}
        <div className="input-group">
          <label>Civil Status <span style={{ color: newUser.civil_status ? 'blue' : 'red' }}>*</span></label>
          <select name="civil_status" value={newUser.civil_status} onChange={handleNewUserChange} required>
            <option value="" disabled>-- Select Civil Status--</option>
            <option value="single">Single</option>
            <option value="married">Married</option>
            <option value="widowed">Widowed</option>
            <option value="separated">Separated</option>
          </select>
        </div>

        {/* Contact Number */}
        <div className="input-group">
          <label>Contact Number <span style={{ color: newUser.contact_number ? 'blue' : 'red' }}>*</span></label>
          <input type="text" name="contact_number" value={newUser.contact_number} onChange={handleNewUserChange} maxLength={11} required />
        </div>

        {/* Email */}
        <div className="input-group">
          <label>Email <span style={{ color: newUser.email ? 'blue' : 'red' }}>*</span></label>
          <input type="email" name="email" value={newUser.email} onChange={handleNewUserChange} autoComplete="new-email" required />
        </div>

        {/* Address */}
        <div className="input-group">
          <label>Address <span style={{ color: newUser.address ? 'blue' : 'red' }}>*</span></label>
          <select name="address" value={newUser.address} onChange={handleNewUserChange} required>
            <option value="">-- Purok --</option>
            <option value="Purok 1">Purok 1</option>
            <option value="Purok 2">Purok 2</option>
            <option value="Purok 3">Purok 3</option>
            <option value="Purok 4">Purok 4</option>
            <option value="Purok 5">Purok 5</option>
            <option value="Purok 6">Purok 6</option>
            <option value="Purok 7">Purok 7</option>
          </select>
        </div>

        {/* Password */}
        <div className="input-group password-group">
          <label>Password <span style={{ color: newUser.password ? 'blue' : 'red' }}>*</span></label>
          <input type={showPassword ? "text" : "password"} name="password" value={newUser.password} onChange={handleNewUserChange} autoComplete="new-password" required />
          <span className="eye" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {/* File Inputs */}
        {["personal_picture", "valid_id_front", "valid_id_back"].map((field) => (
          <div className="input-group" key={field}>
            <label>
              {field === "personal_picture" ? "Personal Photo" : field === "valid_id_front" ? "Valid ID (Front)" : "Valid ID (Back)"}{" "}
              <span style={{ color: newFiles[field] ? "blue" : "red" }}>*</span>
            </label>

            {!newFiles[field] ? (
              <input type="file" name={field} onChange={handleNewFileChange} required />
            ) : (
              <div className="file-preview">
                {newFiles[field].type.startsWith("image/") && (
                  <img src={URL.createObjectURL(newFiles[field])} alt="preview" className="file-image" />
                )}
                <span className="file-name">
                  {newFiles[field].name}{" "}
                  <button type="button" onClick={() => handleRemoveNewFile(field)} className="remove-button">✕</button>
                </span>
              </div>
            )}
          </div>
        ))}

        {/* Buttons */}
        <div className="modal-actions-centered">
          <button type="submit" className="btn-primary">Add User</button>
          <button
            type="button"
            className="btn-cancel"
            onClick={() => setShowAddUserModal(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
)}






  <input
    type="text"
    className="search-input"
    placeholder="Search by name, email, purok..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
  <SearchIcon sx={{ fontSize: 30, color: 'rgba(0, 0, 0, 1)', position: "relative", top: "1px" }} />
</div>




<button  className="Adduser"onClick={() => setShowAddUserModal(true)}>
  <PersonAddIcon /> Add User
</button>
<hr className='split'/>

<div className="user-summary">

  <div className="summary-box">
    <div className="left-bar total-bar"></div>
    <PeopleAltIcon  sx={{ fontSize: 50, color: 'rgba(25, 82, 228, 1)', }}/>
    <p className="label">Total Users</p>
    <h1 className="count1">{totalUsers}</h1>
  </div>

  <div className="summary-box">
    <div className="left-bar pending-bar"></div>
    <AccessTimeIcon  sx={{ fontSize: 50, color: 'rgba(214, 236, 17, 1)', }} />
    <p className="label">Pending</p>
    <h1 className="count2">{pendingCount}</h1>
  </div>

  <div className="summary-box">
    <div className="left-bar approved-bar"></div>
    <TaskAltIcon  sx={{ fontSize: 50, color: 'rgba(5, 160, 8, 1)', }}/>
    <p className="label">Approved</p>
    <h1 className="count3">{approvedCount}</h1>
  </div>

  <div className="summary-box">
    <div className="left-bar rejected-bar"></div>
    <CancelIcon  sx={{ fontSize: 50, color: 'rgba(216, 14, 14, 1)', }}/>
    <p className="label">Rejected</p>
    <h1 className="count4">{rejectedCount}</h1>
  </div>
</div>



      {/* USERS TABLE */}
      <table className='table'>
        <thead>
          <tr>
            <th>User ID</th>
            <th>FullName</th>
            <th>Sex</th>
            <th>Address</th>
            <th>Email</th>
             <th>Created_At</th>
              <th>Updated_At</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
            {users
    .filter((user) => {
      if (searchTerm.trim() === "") return true;
      const term = searchTerm.toLowerCase();
      return (
        user.fullname?.toLowerCase().includes(term) ||
        user.email?.toLowerCase().includes(term) ||
        user.address?.toLowerCase().includes(term) ||
        user.status?.toLowerCase().includes(term)
      );
    })
       .map((u) => (
            <tr key={u.user_id}>
              <td>{u.user_id}</td>
              <td>{u.fullname}</td>
              <td>{u.sex}</td>
              <td>{u.address}</td>
              <td>{u.email}</td>
              <td>{new Date(u.created_at).toLocaleDateString()}</td>
              <td>{new Date(u.updated_at).toLocaleDateString()}</td>

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
                <button className="approve-btn" onClick={() => handleStatusChange(u.user_id, 'approved')}>Approve</button>
                <button className="reject-btn" onClick={() => handleStatusChange(u.user_id, 'rejected')}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* USER MODAL (same as before) */}
      {showModal && selectedUser && (
        <div className="user-modal-overlay">
          <div className="user-modal">
            <div className="profile-header">
              <button className="close-btn" onClick={handleClose}>✕</button>
            </div>
            <div className="profile-body">
              <div className="avatar-container">
                <img
                  src={
                    selectedUser.personal_picture
                      ? `http://127.0.0.1:8000/storage/${selectedUser.personal_picture}`
                      : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                  alt="Profile"
                  className="profile-avatar"
                />
              </div>

              <div className="profile-info">
                <h3 className="section-title">Account Information</h3>
                <div className="field"><label>User ID</label><p>{selectedUser.user_id}</p></div>
                <div className="field"><label>Full Name</label>{selectedUser.editMode ? <input type="text" value={selectedUser.fullname} onChange={(e) => handleEditChange(e, "fullname")} /> : <p>{selectedUser.fullname}</p>}</div>
                <div className="field"><label>Sex</label>{selectedUser.editMode ? <select value={selectedUser.sex} onChange={(e) => handleEditChange(e, "sex")}><option value="">Select</option><option value="Male">Male</option><option value="Female">Female</option></select> : <p>{selectedUser.sex}</p>}</div>
                <div className="field"><label>Birthdate</label>{selectedUser.editMode ? <input type="date" value={selectedUser.birthdate?.substring(0, 10)} onChange={(e) => handleEditChange(e, "birthdate")} /> : <p>{selectedUser.birthdate?.substring(0, 10)}</p>}</div>
                <div className="field"><label>Civil Status</label>{selectedUser.editMode ? <select value={selectedUser.civil_status} onChange={(e) => handleEditChange(e, "civil_status")}><option value="">Select</option><option value="Single">Single</option><option value="Married">Married</option><option value="Widowed">Widowed</option></select> : <p>{selectedUser.civil_status}</p>}</div>
                <h3 className="section-title">Contact Information</h3>
                <div className="field"><label>Contact Number</label>{selectedUser.editMode ? <input type="text" value={selectedUser.contact_number} onChange={(e) => handleEditChange(e, "contact_number")} /> : <p>{selectedUser.contact_number}</p>}</div>
                <div className="field"><label>Email</label>{selectedUser.editMode ? <input type="email" value={selectedUser.email} onChange={(e) => handleEditChange(e, "email")} /> : <p>{selectedUser.email}</p>}</div>
           <div className="field">
  <label>Address (Purok)</label>
  {selectedUser.editMode ? (
    <select
      value={selectedUser.address}
      onChange={(e) => handleEditChange(e, "address")}
    >
      <option value="">Select Purok</option>
      <option value="Purok 1">Purok 1</option>
      <option value="Purok 2">Purok 2</option>
      <option value="Purok 3">Purok 3</option>
      <option value="Purok 4">Purok 4</option>
      <option value="Purok 5">Purok 5</option>
      <option value="Purok 6">Purok 6</option>
      <option value="Purok 7">Purok 7</option>
      <option value="Purok 8">Purok 8</option>
    </select>
  ) : (
    <p>{selectedUser.address}</p>
  )}
</div>
                <h3 className="section-title">Valid ID</h3>
                <div className="id-images">
                  {selectedUser.valid_id_front && (
                    <img src={`http://127.0.0.1:8000/storage/${selectedUser.valid_id_front}`} alt="ID Front" className="id-pic-large" />
                  )}
                  {selectedUser.valid_id_back && (
                    <img src={`http://127.0.0.1:8000/storage/${selectedUser.valid_id_back}`} alt="ID Back" className="id-pic-large" />
                  )}
                </div>
              </div>
            </div>

            <div className="profile-footer">
              {selectedUser.editMode ? (
                <>
                  <button className="save-btn" onClick={handleSaveChanges}>Save</button>
                  <button className="cancel-btn" onClick={() => toggleEditMode(false)}>Cancel</button>
                </>
              ) : (
                <button className="edit-btn" onClick={() => toggleEditMode(true)}>Edit</button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* FEEDBACK MODAL */}
      {showFeedbackModal && (
        <div className="feedback-modal-overlay">
          <div className={`feedback-modal ${feedbackType}`}>
            <h3>{feedbackMessage}</h3>
            <button onClick={closeFeedbackModal} className="close-button">OK</button>
          </div>
        </div>
      )}
    </div>
    </>
  );
}

export default UserManagement;
