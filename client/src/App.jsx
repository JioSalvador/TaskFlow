import { Route, Routes } from 'react-router-dom';
import './App.css'
import LoginSignup from './Components/LoginSignup/LoginSignup';
import EmailVerification from './Components/EmailVerification/EmailVerification';
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <div>
      {/**<LoginSignup*/}
      <Routes>
        <Route path='/' element = {"Home"}/>
        <Route path='/LoginSignup' element = {<LoginSignup/>}/>
        <Route path='/verify-email' element = {<EmailVerification/>}/>
        <Route path='/forgot-password' element = {"forgot password"}/>
      </Routes>
      <Toaster/>
    </div>
  );
}

export default App;
