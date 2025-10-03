import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Homepage from './components/Homepage'
import AboutUs from './components/AboutUs'
import Services from './components/Services'
import RegistrationForm from './components/Registration'
import LoginForm from './components/LoginForm'
function App() {


  return (

    <Router>
      <Routes>
        <Route path="/" element= {<Homepage/>}/>
         <Route path="/AboutUs" element= {<AboutUs/>}/>
          <Route path="/services" element= {<Services/>}/>
         <Route path="/login" element= {<LoginForm/>}/>
        <Route path="/registration" element= {<RegistrationForm/>}/>
       
      </Routes>
    </Router>
  )
}

export default App
