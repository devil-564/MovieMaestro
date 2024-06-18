import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Home from './Component/Home';
import Signup from './Component/Signup';
import Login from './Component/Login';
import ChoosingSection from './Component/ChoosingSection';
import EState from "./context/everything_context/estate";
import Landing from './Component/Landing';
import Ticket from './Component/Ticket';
import IndividualMovie from './Component/IndividualMovie';
import LoaderMain from './Component/LoaderMain';
import About from './Component/About';
import Navbar from "./Component/Navbar"
import AdminHome from './Component/AdminHome';
import AdminSignup from './Component/AdminSignup';
import AdminLogin from './Component/AdminLogin';
import Success from './Component/Success';
import Cancel from './Component/Cancel';



function App() {
  return (
      <EState>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home/>}></Route>
            <Route exact path='/navbar' element = {<Navbar />}></Route>
            <Route exact path='/choosingsection' element={<ChoosingSection />}></Route>
            <Route exact path='/signup' element={<Signup />}></Route>
            <Route exact path='/login' element={<Login />}></Route>
            <Route exact path='/ticket' element={<><Navbar /> <Ticket /></>}></Route>
            <Route exact path='/landing' element={<><Navbar /> <Landing /></>}></Route>
            <Route exact path='/individual' element={<><Navbar /><IndividualMovie /></>}></Route>
            <Route exact path='/about' element={<><Navbar /><About /></>}></Route>
            <Route exact path='/loadermain' element={<LoaderMain />}></Route>
            <Route exact path='/adminsignup' element={<AdminSignup />}></Route>
            <Route exact path='/adminlogin' element={<AdminLogin />}></Route>
            <Route exact path='/adminhome' element={<AdminHome />}></Route>
            <Route exact path='/success' element={<Success />}></Route>
            <Route exact path='/cancel' element={<Cancel />}></Route>
          </Routes>
        </Router>
      </EState>
  );
}

export default App;
