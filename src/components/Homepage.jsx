
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
           <p className="pcolor"> A digital platform designed to simplify and speed up the process of
            requesting and issuing barangay documents. <br/> Residents can easily apply for certificates such 
            as Barangay Clearance, Certificate of Residency, and Indigency <br/>online — reducing the need for 
            in-person visits and long waiting times.</p>


<Link to="/login" className="login"><LoginIcon className="loginIcon" />Login</Link>

<p className="request"> <TextSnippetIcon className="document-icon"/>Request Documents</p>
         </div>
    )
}
export default Homepage;
