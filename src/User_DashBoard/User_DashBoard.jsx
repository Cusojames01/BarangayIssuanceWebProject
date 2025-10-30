import {NavLink} from 'react-router-dom'
import  '../CssComponents/UserDashBoard.css'
import HomeIcon from '@mui/icons-material/Home';
import { useState, useEffect } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DescriptionIcon from '@mui/icons-material/Description';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import {Link} from 'react-router-dom'

function UserDashBoard(){
    const [user, setUser]=useState(null)
    
    useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    if (savedUser) 
     {
         setUser(savedUser);
     }
     }, []);

    return(
     <div>
     <nav>
      <NavLink className="Users_Dasboard" to={'/userdashboard'}><HomeIcon/> DashBoard</NavLink>
     </nav>

    <div  className='UserDashBoardContainer'>
     <h1>Welcome,
     <span className='name'>{user ? user.fullname : 'User'} </span> 
     </h1>

     <p>Easily request certificates, track your request, and manage your profile
     right here in our dashboard</p>
     </div>

    <hr className='hr'/>
<div className='Sections'>
    <div className='ProfileSection'>
  <div className='ProfileContent'>
    <AccountCircleIcon sx={{ fontSize: 50, color: 'rgba(47, 74, 251, 1)'}}/>
    <h1 className='Profiletext'>My Profile</h1>
      <h3 className='description1'>Manage your profile information</h3>
          <Link  className='viewprofile' to="/profile">View Profile</Link>
  </div>
  </div>


 <div className='ProfileSection'>
  <div className='ProfileContent'>
    <DescriptionIcon sx={{ fontSize: 50, color: 'rgba(5, 160, 8, 1)', }}/>
    <h1 className='Profiletext'>Request Documents</h1>
      <h3 className='description2'>Request barangay certificates  and 
official documents</h3>

 <Link  className='requestdoc'to="requestdocs">Make Request</Link>
  </div>
  </div>
  <div className='ProfileSection'>
  <div className='ProfileContent'>
    <BookmarkIcon sx={{ fontSize: 50, color: 'rgba(70, 0, 155, 1)', }}  />
    <h1 className='Profiletext'>My Request</h1>

        <h3 className='description3'>Track and manage your barangay
 request anytime</h3>
    <Link  className='viewrequest'to="viewrequest">View Request</Link>
  </div>
  </div>
  </div>
     </div>
    )
}

export default UserDashBoard; 