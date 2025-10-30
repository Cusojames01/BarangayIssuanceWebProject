import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import '../CssComponents/Registration.css';
import axios from 'axios';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

function RegistrationForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const [data, setData] = useState({
    fullname: "",
    sex: "",
    birthdate: "",
    civil_status: "",
    contact_number: "",
    email: "",
    address: "",
    password: "",
  });

  const [files, setFiles] = useState({
    personal_picture: null,
    valid_id_front: null,
    valid_id_back: null,
  });

  // Update input values
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  // Update file inputs
  const handleFileChange = (e) => {
    const { name, files: selectedFiles } = e.target;
    if (selectedFiles && selectedFiles[0]) {
      setFiles((prev) => ({ ...prev, [name]: selectedFiles[0] }));
    }
  };

  const handleRemoveFile = (name) => {
    setFiles((prev) => ({ ...prev, [name]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => formData.append(key, value));
    Object.entries(files).forEach(([key, value]) => value && formData.append(key, value));

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/auth/register",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log("Success:", response.data);

      // Show modal
      setShowModal(true);

      // Clear inputs
      setData({
        fullname: "",
        sex: "",
        birthdate: "",
        civil_status: "",
        contact_number: "",
        email: "",
        address: "",
        password: "",
      });
      setFiles({ personal_picture: null, valid_id_front: null, valid_id_back: null });

      // Auto redirect after 3 seconds if user doesn't click
      setTimeout(() => {
        navigate('/login');
      }, 3000);

    } catch (error) {
      console.error("Failed:", error.response || error);
      alert("Something went wrong. Check console for details.");
    }
  };

  return (
    <div className="Container">
      <h2>Registration Form</h2>
      <p>Please fill in the form below to create your account</p>

      <form onSubmit={handleSubmit}>
        {/* Full Name */}
        <div className="input-group">
          <label>Full Name <span style={{ color: data.fullname ? 'blue' : 'red' }}>*</span></label>
          <input type="text" name="fullname" placeholder="Full Name" value={data.fullname} onChange={handleChange} required />
        </div>

        {/* Date of Birth */}
        <div className="input-group">
          <label>Date Of Birth <span style={{ color: data.birthdate ? 'blue' : 'red' }}>*</span></label>
          <input type="date" name="birthdate" value={data.birthdate} onChange={handleChange} required />
        </div>

        {/* Sex */}
        <div className="input-group">
          <label>Sex <span style={{ color: data.sex ? 'blue' : 'red' }}>*</span></label>
          <select name="sex" value={data.sex} onChange={handleChange} required>
            <option value="" disabled>-- Select Gender --</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        {/* Civil Status */}
        <div className="input-group">
          <label>Civil Status <span style={{ color: data.civil_status ? 'blue' : 'red' }}>*</span></label>
          <select name="civil_status" value={data.civil_status} onChange={handleChange} required>
            <option value="" disabled>-- Select Civil Status--</option>
            <option value="single">Single</option>
            <option value="married">Married</option>
            <option value="widowed">Widowed</option>
            <option value="separated">Separated</option>
          </select>
        </div>

        {/* Contact Number */}
        <div className="input-group">
          <label>Contact Number <span style={{ color: data.contact_number ? 'blue' : 'red' }}>*</span></label>
          <input type="text" name="contact_number" value={data.contact_number} onChange={handleChange} maxLength={11} required />
        </div>

        {/* Email */}
        <div className="input-group">
          <label>Email <span style={{ color: data.email ? 'blue' : 'red' }}>*</span></label>
          <input type="email" name="email" value={data.email} onChange={handleChange} autoComplete="new-email" required />
        </div>

        {/* Address */}
        <div className="input-group">
          <label>Address <span style={{ color: data.address ? 'blue' : 'red' }}>*</span></label>
          <select name="address" value={data.address} onChange={handleChange} required>
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
          <label>Password <span style={{ color: data.password ? 'blue' : 'red' }}>*</span></label>
          <input type={showPassword ? "text" : "password"} name="password" value={data.password} onChange={handleChange} autoComplete="new-password" required />
          <span className="eye" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {/* File Inputs */}
        {["personal_picture", "valid_id_front", "valid_id_back"].map((field) => (
          <div className="input-group" key={field}>
            <label>
              {field === "personal_picture" ? "Personal Photo" : field === "valid_id_front" ? "Valid ID (Front)" : "Valid ID (Back)"}{" "}
              <span style={{ color: files[field] ? "blue" : "red" }}>*</span>
            </label>

            {!files[field] ? (
              <input type="file" name={field} onChange={handleFileChange} required />
            ) : (
              <div className="file-preview">
                {files[field].type.startsWith("image/") && (
                  <img src={URL.createObjectURL(files[field])} alt="preview" className="file-image" />
                )}
                <span className="file-name">
                  {files[field].name}{" "}
                  <button type="button" onClick={() => handleRemoveFile(field)} className="remove-button">✕</button>
                </span>
              </div>
            )}
          </div>
        ))}

        <button type="submit" className="sumbit-buttons">Submit</button>
        <p>Already have an account? <Link to="/login">Login here</Link></p>
      </form>

      {/* Success Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <TaskAltIcon style={{ fontSize: 50, color: "green" }} />
            <h3>Registration Successful</h3>
            <p>Please wait for approval before logging in.</p>
            <button onClick={() => {
              setShowModal(false);
              navigate("/login");
            }}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default RegistrationForm;
