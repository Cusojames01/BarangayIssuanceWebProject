import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Homepage from './components/Homepage'
import AboutUs from './components/AboutUs'
import Services from './components/Services'
import RegistrationForm from './components/Registration'
import LoginForm from './components/LoginForm'
import AdminDashBoard from './Admin_DashBoard/AdminDashBoard'
import UserManagement from './Admin_DashBoard/UserManagement'
import UserDashBoard from './User_DashBoard/User_DashBoard'
function App() {


  return (

    <Router>
      <Routes>
        <Route path="/" element= {<Homepage/>}/>
         <Route path="/AboutUs" element= {<AboutUs/>}/>
          <Route path="/services" element= {<Services/>}/>
         <Route path="/login" element= {<LoginForm/>}/>
        <Route path="/registration" element= {<RegistrationForm/>}/>

       <Route path="/dashboard" element= {<AdminDashBoard/>}/> {/* Admin Dashboard */}
        <Route path="/user_management" element= {<UserManagement/>}/>
       
         <Route path="/dashboard" element= {<UserDashBoard/>}/> {/* User Dashboard */}
      </Routes>
    </Router>
  )
}

export default App
