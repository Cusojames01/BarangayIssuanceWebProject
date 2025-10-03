import '../CssComponents/LoginForm.css';
import {useState} from 'react'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
function LoginForm(){
    const [showpassword, setshowpassword] = useState(false);
   const [userdata,setUserData]= useState({Username:"", Password:""})
   
   const HandleChange=(e)=>{
    const {name, value} = e.target;
    setUserData({
        ...userdata,
        [name]:value
    })
   }

    return(
        <div className="LoginContainer">   
         
            <form>    
                <h2>Login</h2>
            <div className="input-group">
 
        
           <input type="email" name="Username" value={userdata.Username} onChange={HandleChange} placeholder="Username" required/>
            </div>

             <div className="input-group">

             <input type={ showpassword? "text": "password"}   name="Password" value={userdata.Password}   onChange={HandleChange} placeholder="Password" required/>
             <span  className="passicon"onClick={()=>setshowpassword(!showpassword)}>
                 {showpassword ? <FaEyeSlash /> : <FaEye />}
             </span>
            </div >
            <p className='forgotpass'>Forgot Password?</p>
            <button type="submit">Login</button>
            <p className='link'>
        Don't have an account? <Link to="/registration">Sign Up</Link>
        </p>
        </form>    
        </div>
    )
}
export default LoginForm;