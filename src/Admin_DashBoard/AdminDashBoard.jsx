
import {NavLink} from 'react-router-dom'
function AdminDashBoard(){

    return(

<div>


    <nav>
        
    </nav>
       <div className='sidebar'>
<NavLink to={'/dashboard'}>DashBoard</NavLink>
<NavLink to={'/user_management'}>User Management</NavLink>
<NavLink to={'/document_management'}>Document Management</NavLink>

        </div>

</div>
    )
}
export default AdminDashBoard;