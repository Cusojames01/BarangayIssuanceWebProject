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
            <div className="input-group">
 
        
           <input type="email" name="email" value={userdata.email} onChange={HandleChange} placeholder="Username" required/>
            </div>

             <div className="input-group">

             <input type={ showpassword? "text": "password"}   name="password" value={userdata.password}   onChange={HandleChange} placeholder="Password" required/>
             <span  className="passicon"onClick={()=>setshowpassword(!showpassword)}>
                 {showpassword ? <FaEyeSlash /> : <FaEye />}
             </span>
            </div >
              {error && <p className="error-message">{error}</p>}

            <p className='forgotpass'>Forgot Password?</p>
        <button type="submit"  >Login</button>
            <p className='link'>
        Don't have an account? <Link to="/registration">Sign Up</Link>
        </p>
        </form>    
        </div>
    )
}
export default LoginForm;