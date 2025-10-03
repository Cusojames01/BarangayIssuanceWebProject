import {Link} from 'react-router-dom'
import {useState} from 'react'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import '../CssComponents/Registration.css'
import axios from 'axios';
import { Key } from '@mui/icons-material';


function RegistrationForm(){
const [showpassword, setshowpassword] = useState(false);


 const [data, setData]=useState({
// Personal info
FullName:"",
Sex:"",
BirthDate: "",
CivilStatus:"",
//Contact info
ContactNumber:"", 
Email:"",
// Residence
Address:"",
Password:""

});

 const handleChange =(e)=>{
const{name,value} =e.target;
setData({
   ...data,
   [name]:value
})
}

const [Files,setFiles] =useState({
   IdentityPicture: null,
   ValidIdFront:null,
   ValidIdBack:null,
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
const HandleSubmit = async (e)=>{
e.preventDefault();


const formdata = new FormData();
Object.entries(data).forEach(([Key,value])=>{
formdata.append(Key,value)

})


  Object.entries(Files).forEach(([key, value]) => {
      if (value) {
        formdata.append(key, value);
      }
    });

      try {
    // ✅ axios request nasa loob pa rin ng async
    const response = await axios.post(
      "http://localhost:8000/api/auth/register",
      formdata,
      {
        headers: {
          // optional lang 'to, pwede mong alisin
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("✅ Registration success:", response.data);
    alert("Registration successful!");
  } catch (error) {
    console.error(" Registration failed:", error);
    alert("Something went wrong. Please try again.");
  }
};




 return(
    <div className="Container">

  <h2>Registration Form</h2>
  <p>Please fill in the form below to create your account</p>

         <form onSubmit={HandleSubmit}>
    
            <div className="input-group">
            <label>Full Name <span style={{ color: data.FullName ? 'blue' : 'red' }}>*</span></label>
            <input type="text" name="FullName" className="FullName-input" placeholder='FullName'  value={data.FullName} onChange={handleChange} required/>
            </div>

        
            <div className="input-group">
            <label>Date Of Birth <span style={{ color: data.BirthDate ? 'blue' : 'red' }}>*</span></label>
            <input type="date" name="BirthDate"  value={data.BirthDate} onChange={handleChange} required/>
            </div>
     

             <div className="input-group">
             <label>Sex <span style={{ color: data.Sex ? 'blue' : 'red' }}>*</span></label>
             <select name='Sex'  value={data.Sex} onChange={handleChange} required>
             <option value="" disabled>-- Select Gender --</option>
             <option value="male">Male</option>
             <option value="female">Female</option>
             </select>
             </div>


             <div className="input-group">
             <label>Civil Status <span style={{ color: data.CivilStatus ? 'blue' : 'red' }}>*</span></label>
             <select  name="CivilStatus"value={data.CivilStatus} onChange={handleChange} required>
              <option value="" disabled>-- Select Civil Status--</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
              <option value="widowed">Widowed</option>
               <option value="separated">Separated</option>
               </select>
               </div>


             <div className="input-group">
            <label>Contact Number <span style={{ color: data.ContactNumber ? 'blue' : 'red' }}>*</span></label>
            <input type="text" name="ContactNumber"value={data.ContactNumber} onChange={handleChange} required maxLength={11}/>
             </div>

            <div className="input-group">
            <label>Gmail <span style={{ color: data.Email ? 'blue' : 'red' }}>*</span></label>
            <input type="email" name="Email"value={data.Email} onChange={handleChange} required/>
            </div>


          <div className="input-group">
            <label> Address<span style={{ color: data.Address ? 'blue' : 'red' }}>*</span></label>
            <input type="text" name="Address"placeholder='Purok /Barangay /Municipality /Province'  value={data.Address} onChange={handleChange} required/>
           </div>
        
          <div className="input-group">
            <label>Password<span style={{ color: data.Password ? 'blue' : 'red' }}>*</span></label>
            <input type={showpassword ?  "text" : "password"} name="Password"value={data.Password} onChange={handleChange} required/>
                <span className='eye'
            onClick={() => setshowpassword(!showpassword)}>
            {showpassword ? <FaEyeSlash /> : <FaEye />}
          </span> 
         </div>
      
      
          <div className='input-group'>
            <label>Personal Photo  <span style={{ color: Files.IdentityPicture ? 'blue' : 'red' }}>*</span></label>
          {!Files.IdentityPicture? (<input type='file' name="IdentityPicture"  onChange={handleFileChange} required />):(
         <div className='file-preview'>{Files.IdentityPicture.type.startsWith("image/") && (  <img
        src={URL.createObjectURL(Files.IdentityPicture)}
        alt="preview"
        className="file-image"/>)}
        <span className='file-name'>
         {Files.IdentityPicture.name} 
         <button type='button' onClick={()=> HandleRemoveFile("IdentityPicture") } className=' remove-button'>✕</button> </span>
        </div>

           ) }

          </div>
           <div className='input-group'>
             <label>Valid ID (Front) <span style={{ color: Files.ValidIdFront ? 'blue' : 'red' }}>*</span></label>
          {!Files.ValidIdFront? (<input type='file' name="ValidIdFront"  onChange={handleFileChange} required/>):(

            <div className='file-preview'>{Files.ValidIdFront.type.startsWith("image/") && (  <img
        src={URL.createObjectURL(Files.ValidIdFront)}
        alt="preview"
        className="file-image"/>)}
        <span className='file-name'>
         {Files.ValidIdFront.name} 
         <button type='button' onClick={()=> HandleRemoveFile("ValidIdFront") } className=' remove-button'>✕</button> 
         </span>
        </div>

           ) }

          </div>
           <div className='input-group'>
           <label>Valid ID (Back)<span style={{ color: Files.ValidIdBack ? 'blue' : 'red' }}>*</span></label>
          {!Files.ValidIdBack? (<input type='file' name="ValidIdBack"  onChange={handleFileChange} required/>):(

            <div className='file-preview'>{Files.ValidIdBack.type.startsWith("image/") && (  <img
        src={URL.createObjectURL(Files.ValidIdBack)}
        alt="preview"
        className="file-image"/>)}
        <span className='file-name'>
         {Files.ValidIdBack.name} 
         <button type='button' onClick={()=> HandleRemoveFile("ValidIdBack") } className=' remove-button'>✕</button> </span>
        </div>

           ) }

          </div>
       
      
     
            <button   className='sumbit-button'type='submit'>Submit</button>
             <p>Already have an account? <Link to="/login">Login here</Link></p>
      </form>
    
    </div>

 )
}
export default RegistrationForm
