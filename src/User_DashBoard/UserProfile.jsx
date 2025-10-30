import React, { useState, useEffect } from "react";
import "../CssComponents/Profile.css";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    sex: "",
    birthdate: "",
    civil_status: "",
    contact_number: "",
    email: "",
    address: "",
    personal_picture: "",
  });

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      setUser(savedUser);
      setFormData(savedUser);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle image upload (preview instantly)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, personal_picture: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    localStorage.setItem("user", JSON.stringify(formData));
    setUser(formData);
    setEditMode(false);
  };

  if (!user) return <p>Loading profile...</p>;

  // Determine what image to show
  const profileImage = formData.personal_picture
    ? formData.personal_picture.startsWith("data:image") // local preview
      ? formData.personal_picture
      : `http://127.0.0.1:8000/storage/${formData.personal_picture}`
    : "https://cdn-icons-png.flaticon.com/512/149/149071.png"; // default avatar

  return (
    <div className="profile-wrapper">
      <div className="profile-card">
        <div className="profile-header">
          <h2>My Profile</h2>
          <button className="close-btn" onClick={() => window.history.back()}>
            <CloseIcon />
          </button>
        </div>

        <div className="profile-body">
          <div className="avatar-container">
            <div className="avatar-wrapper">
              <img src={profileImage} alt="Profile" className="profile-avatar" />
              {editMode && (
                <label className="avatar-overlay">
                  Change Photo
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    hidden
                  />
                </label>
              )}
            </div>
          </div>

          <div className="profile-info">
            <h3 className="section-title">Personal Information</h3>

            <div className="field">
              <label>Full Name</label>
              {editMode ? (
                <input
                  type="text"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                />
              ) : (
                <p>{user.fullname}</p>
              )}
            </div>

            <div className="field">
              <label>Sex</label>
              {editMode ? (
                <select name="sex" value={formData.sex} onChange={handleChange}>
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              ) : (
                <p>{user.sex}</p>
              )}
            </div>

            <div className="field">
              <label>Birthdate</label>
              {editMode ? (
                <input
                  type="date"
                  name="birthdate"
                  value={formData.birthdate}
                  onChange={handleChange}
                />
              ) : (
                <p>{user.birthdate ? user.birthdate.split("T")[0] : ""}</p>
              )}
            </div>

            <div className="field">
              <label>Civil Status</label>
              {editMode ? (
                <select
                  name="civil_status"
                  value={formData.civil_status}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Widowed">Widowed</option>
                </select>
              ) : (
                <p>{user.civil_status}</p>
              )}
            </div>

            <h3 className="section-title">Contact Information</h3>

            <div className="field">
              <label>Contact Number</label>
              {editMode ? (
                <input
                  type="text"
                  name="contact_number"
                  value={formData.contact_number}
                  onChange={handleChange}
                />
              ) : (
                <p>{user.contact_number}</p>
              )}
            </div>

            <div className="field">
              <label>Email</label>
              {editMode ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              ) : (
                <p>{user.email}</p>
              )}
            </div>

            <div className="field">
              <label>Residence</label>
              {editMode ? (
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              ) : (
                <p>{user.address}</p>
              )}
            </div>
          </div>
        </div>

        <div className="profile-footer">
          {editMode ? (
            <>
              <button className="save-btn" onClick={handleSave}>
                <SaveIcon /> Save Changes
              </button>
              <button className="cancel-btn" onClick={() => setEditMode(false)}>
                <CancelIcon /> Cancel
              </button>
            </>
          ) : (
            <button className="edit-btn" onClick={() => setEditMode(true)}>
              <EditIcon /> Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
