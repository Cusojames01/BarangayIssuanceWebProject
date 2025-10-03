import {NavLink} from 'react-router-dom'
import LoginIcon from '@mui/icons-material/Login';
import Logo from '../assets/logo.png';
import  '../CssComponents/Navbar.css'
function AboutUs(){
         
    return(
                <div>
                  
                <nav>
                      <div className="logo-container">
                           <img src={Logo} alt="Logo" className="logo" />
                           <span>Barangay Tubod</span>
                     </div>
                            
          <NavLink to="/"  className={({ isActive }) => isActive ? "active-link" : "" } >Home</NavLink>
          <NavLink to="/AboutUs"  className={({ isActive }) => isActive ? "active-link" : "" }>About</NavLink>
          <NavLink to="/services" className={({ isActive }) => isActive ? "active-link" : "" }>Services</NavLink>
          <NavLink to="/registration"  >Sign Up</NavLink>
          <NavLink  to="/login">   <LoginIcon className="login-icon" />login</NavLink>


       </nav>
         <p> under development</p>
       </div>
    )}
export default AboutUs;