
import {NavLink} from 'react-router-dom'
function AdminDashBoard(){

    return(


        <div>
<NavLink to={'/dashboard'}>DashBoard</NavLink>
<NavLink to={'/user_management'}>User Management</NavLink>
<NavLink to={'/document_management'}>Document Management</NavLink>
<NavLink to={'/logout'}>Logout</NavLink>

        </div>
    )
}
export default AdminDashBoard;