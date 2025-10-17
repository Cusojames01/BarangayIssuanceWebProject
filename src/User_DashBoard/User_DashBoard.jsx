import {NavLink} from 'react-router-dom'
function UserDashBoard(){
    return(
     <div>
     <nav>
      <NavLink to={'/userdashboard'}>DashBoard</NavLink>
     </nav>
     </div>
    )
}

export default UserDashBoard; 