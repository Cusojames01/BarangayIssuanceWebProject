import {Link} from 'react-router-dom'
import {useState} from 'react'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import '../CssComponents/Registration.css'
import axios from 'axios';
import { Key } from '@mui/icons-material';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

function RegistrationForm(){
const [showpassword, setshowpassword] = useState(false);
const [showModal, setShowModal] = useState(false);

 const [data, setData]=useState({
// Personal info
fullname:"",
sex:"",
birthdate: "",
civil_status:"",
//Contact info
contact_number:"", 
email:"",
// Residence
address:"",
password:""

});

 const handleChange =(e)=>{
const{name,value} =e.target;
setData({
   ...data,
   [name]:value
})
}

const [Files,setFiles] =useState({
   personal_picture: null,
   valid_id_front:null,
   valid_id_back:null,
})

 const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
        setFiles((prev) => ({
            ...prev,
            [name]: files[0]
        }));
    }
};
       const HandleRemoveFile = (name) => {
      setFiles((prev) => ({   
         ...prev,
         [name]: null
      }));
   }


const HandleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => formData.append(key, value));
    Object.entries(Files).forEach(([key, value]) => value && formData.append(key, value));

    try {
        const response = await axios.post(
            "http://127.0.0.1:8000/api/auth/register",
            formData,
            { headers: { "Content-Type": "multipart/form-data" } } // ✅ important!
        );
        console.log("Success:", response.data);
       setShowModal(true);

       

           // Clear the fields after successful submission.
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

    // 🔹 Clear file uploads
    setFiles({
      personal_picture: null,
      valid_id_front: null,
      valid_id_back: null,
    });

    } catch (error) {
        console.error("Failed:", error.response || error);
        alert("Something went wrong. Check console for details.");
    }
};




 return(
    <div className="Container">

  <h2>Registration Form</h2>
  <p>Please fill in the form below to create your account</p>

         <form onSubmit={HandleSubmit}>
            
            <div className="input-group">
            <label>Full Name <span style={{ color: data.fullname ? 'blue' : 'red' }}>*</span></label>
            <input type="text" name="fullname" className="FullName-input" placeholder='FullName'  value={data.fullname} onChange={handleChange} required/>
            </div>

        
            <div className="input-group">
            <label>Date Of Birth <span style={{ color: data.birthdate ? 'blue' : 'red' }}>*</span></label>
            <input type="date" name="birthdate"  value={data.birthdate} onChange={handleChange} required/>
            </div>
     

             <div className="input-group">
             <label>Sex <span style={{ color: data.sex ? 'blue' : 'red' }}>*</span></label>
             <select name='sex'  value={data.sex} onChange={handleChange} required>
             <option value="" disabled>-- Select Gender --</option>
             <option value="male">Male</option>
             <option value="female">Female</option>
             </select>
             </div>


             <div className="input-group">
             <label>Civil Status <span style={{ color: data.civil_status ? 'blue' : 'red' }}>*</span></label>
             <select  name="civil_status"value={data.civil_status} onChange={handleChange} required>
              <option value="" disabled>-- Select Civil Status--</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
              <option value="widowed">Widowed</option>
               <option value="separated">Separated</option>
               </select>
               </div>


             <div className="input-group">
            <label>Contact Number <span style={{ color: data.contact_number ? 'blue' : 'red' }}>*</span></label>
            <input type="text" name="contact_number"value={data.contact_number} onChange={handleChange} required maxLength={11}/>
             </div>

            <div className="input-group">
            <label>Gmail <span style={{ color: data.email ? 'blue' : 'red' }}>*</span></label>
            <input type="email" name="email"value={data.email} onChange={handleChange} required/>
            </div>


          <div className="input-group">
            <label> Address<span style={{ color: data.address ? 'blue' : 'red' }}>*</span></label>
            <input type="text" name="address"placeholder='Purok /Barangay /Municipality /Province'  value={data.address} onChange={handleChange} required/>
           </div>
        
          <div className="input-group">
            <label>Password<span style={{ color: data.password ? 'blue' : 'red' }}>*</span></label>
            <input type={showpassword ?  "text" : "password"} name="password"value={data.password} onChange={handleChange} required/>
                <span className='eye'
            onClick={() => setshowpassword(!showpassword)}>
            {showpassword ? <FaEyeSlash /> : <FaEye />}
          </span> 
         </div>
      
      
          <div className='input-group'>
            <label>Personal Photo  <span style={{ color: Files.personal_picture ? 'blue' : 'red' }}>*</span></label>
          {!Files.personal_picture? (<input type='file' name="personal_picture"  onChange={handleFileChange} required />):(
         <div className='file-preview'>{Files.personal_picture.type.startsWith("image/") && (  <img
        src={URL.createObjectURL(Files.personal_picture)}
        alt="preview"
        className="file-image"/>)}
        <span className='file-name'>
         {Files.personal_picture.name} 
         <button type='button' onClick={()=> HandleRemoveFile("personal_picture") } className=' remove-button'>✕</button> </span>
        </div>

           ) }

          </div>
           <div className='input-group'>
             <label>Valid ID (Front) <span style={{ color: Files.valid_id_front? 'blue' : 'red' }}>*</span></label>
          {!Files.valid_id_front? (<input type='file' name="valid_id_front"  onChange={handleFileChange} required/>):(

            <div className='file-preview'>{Files.valid_id_front.type.startsWith("image/") && (  <img
        src={URL.createObjectURL(Files.valid_id_front)}
        alt="preview"
        className="file-image"/>)}
        <span className='file-name'>
         {Files.valid_id_front.name} 
         <button type='button' onClick={()=> HandleRemoveFile("valid_id_front") } className=' remove-button'>✕</button> 
         </span>
        </div>

           ) }

          </div>
           <div className='input-group'>
           <label>Valid ID (Back)<span style={{ color: Files.valid_id_back ? 'blue' : 'red' }}>*</span></label>
          {!Files.valid_id_back? (<input type='file' name="valid_id_back"  onChange={handleFileChange} required/>):(

            <div className='file-preview'>{Files.valid_id_back.type.startsWith("image/") && (  <img
        src={URL.createObjectURL(Files.valid_id_back)}
        alt="preview"
        className="file-image"/>)}
        <span className='file-name'>
         {Files.valid_id_back.name} 
         <button type='button' onClick={()=> HandleRemoveFile("valid_id_back") } className=' remove-button'>✕</button> </span>
        </div>

           ) }

          </div>
       
      
     
         <button   className='sumbit-button'type='submit'>Submit</button>
             <p>Already have an account? <Link to="/login">Login here</Link></p>
      </form>
     {showModal && (
       
        <div className="modal-overlay">
          <div className="modal">
           <TaskAltIcon style={{ fontSize: 50, color: 'green' }} />
            <h3>Registration Successful </h3>
            <p>Please wait for approval before logging in.</p>
            <button onClick={() => setShowModal(false)}>OK</button>
          </div>
        </div>
      )}
    </div>

 )
}
export default RegistrationForm
