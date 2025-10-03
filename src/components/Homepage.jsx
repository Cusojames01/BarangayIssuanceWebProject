
import { NavLink,Link} from "react-router-dom";
import Logo from '../assets/logo.png';
import LoginIcon from '@mui/icons-material/Login';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import '../CssComponents/homepage.css'

function Homepage(){


    return(
      <div className="homepage-container">
      
      <nav>

    <div className="logo-container">
    <img src={Logo} alt="Logo" className="logo" />
    <span>Barangay Tubod</span>
    </div>
          
            <NavLink  to="/" className={({ isActive }) => isActive ? "active-link" : "" }>Home</NavLink>
            <NavLink  to="/AboutUs"  className={({ isActive }) => isActive ? "active-link" : "" }>About</NavLink>
            <NavLink to="/services"  className={({ isActive }) => isActive ? "active-link" : "" }>Services</NavLink>
            <NavLink  to="/registration"> Sign Up</NavLink>
            <NavLink   to="/login">   <LoginIcon className="login-icon" />Login</NavLink>
         </nav>  

       
           <h1 className="TEXT"> 
           <span className="barangay">Barangay</span> 
          <span  className="portal">Portal</span>
          </h1>
           <p className="pcolor">Digital services  platform for the residents of Barangay Tubod, Candijay, Bohol</p>


<Link to="/login" className="login"><LoginIcon className="loginIcon" />Login</Link>

<p className="request"> <TextSnippetIcon className="document-icon"/>Request Documents</p>
         </div>
    )
}
export default Homepage;
