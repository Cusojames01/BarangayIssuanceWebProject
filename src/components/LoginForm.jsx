import '../CssComponents/LoginForm.css';
import {useState} from 'react'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";     
import axios from 'axios';
function LoginForm(){
    const [showpassword, setshowpassword] = useState(false);
   const [userdata,setUserData]= useState({email:"", password:""})
    const [error, setError] = useState("");
    const navigate = useNavigate();

   const HandleChange=(e)=>{
    const {name, value} = e.target;
    setUserData({
        ...userdata,
        [name]:value
    })
   }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await axios.post('http://127.0.0.1:8000/api/login', userdata);
            const user = res.data.user;
          const token = res.data.token;

    // I-save sa localStorage para ma-access sa ibang pages
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);

    
            if (user.role === 'admin') {
                navigate('/dashboard');
            } else {
                navigate('/userdashboard');
            }
        } catch (err) {
            if (err.response) {
                setError(err.response.data.message);
            } else {
                setError("Server error. Please try again.");
            }
        }
    };

    return(
        <div className="LoginContainer">   
         
            <form onSubmit={handleSubmit} >    
                <h2>Login</h2>
            <div className="input">
 
        
           <input type="email" name="email" value={userdata.email} onChange={HandleChange} placeholder="Username"   autoComplete="off"    required/>
            </div>

             <div className="input">

             <input type={ showpassword? "text": "password"}   name="password" value={userdata.password}   onChange={HandleChange} placeholder="Password"      autoComplete="new-password"  required  />
             <span  className="passicon"onClick={()=>setshowpassword(!showpassword)}>  
                 {showpassword ? <FaEyeSlash /> : <FaEye />}
             </span>
            </div >
              {error && <p className="error-message">{error}</p>}

            <p className='forgotpass'>Forgot Password?</p>
        <button className='loginbutton' type="submit"  >Login</button>
            <p className='link'>
        Don't have an account? <Link to="/registration">Sign Up</Link>
        </p>
        </form>    
        </div>
    )
}
export default LoginForm;