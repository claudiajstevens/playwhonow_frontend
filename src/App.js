import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/fonts/fonts.css';
import colors from './ColorPalette';

import Searcher from './components/Searcher';
import NavBar from './components/NavBar/NavBar';
import Hero from './components/Hero/Hero';
import Home from './views/Home';
import Profile from './views/Profile';
import { useLocalState } from './util/useLocalStorage';
import Login from './components/Login/Login';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import SignUp from './components/SignUp/SignUp';
import Festivals from './views/Festivals';
import Festival from './components/Festival/Festival';
import Footer from './components/Footer';
import Layout from './components/Layout';
import RequireAuth from './components/RequireAuth';
import Admin from './components/Admin/Admin';
import Unauthorized from './components/Unauthorized';
import Missing from './components/Missing';
import PersistLogin from './components/PersistLogin';

const ROLES = {
  'User': 2,
  'Admin': 1
}

function App() {
  // may want to save jwt in cookie instead of local storage
  
  // const [jwt, setJwt] = useLocalState("", "jwt");

  // useEffect( () => {
  //   console.log(`JWT is: ${jwt}`);
  // }, [jwt]);


  //adding connection to spring boot application
  // fetch returns a promise
  // useEffect( () => {
  //   fetch('/hello?name="Cloud"')
  //   .then(response=>response.text())
  //   .then(result=>console.log(result));
  // }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>

        {/* public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        {/* <Route path="/festivals" element={<Festivals />}></Route> */}
        <Route path="/festivals/:id" element={<Festival />} />
        <Route path="/unauthorized" element={<Unauthorized />} />



        {/* private protexted routes */}

          {/* user protected routes */}
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Admin]}/>}>
              <Route path="/profile" element={<Profile /> } />
              <Route path="/festivals" element={<Festivals />}></Route>
            </Route>

            {/* admin protected routes */}
            <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
              <Route path="/admin" element={<Admin />} />
            </Route>


            <Route path="/profile" element={
              <PrivateRoute>
                  <Profile />
              </PrivateRoute>
            }></Route>
          </Route>



        {/* catch all */}
        <Route path='*' element={<Missing />} />
      
      </Route>
    </Routes>


    // <>
    //   <Router>
    //     <div className='page-wrapper'>
    //       <NavBar />
    //       <div className='app-pages'>
    //         <Routes>
    //           <Route path="/profile" element={
    //             <PrivateRoute>
    //               <Profile />
    //             </PrivateRoute>
    //           }></Route>
    //           <Route path="/festivals" element={<Festivals />}></Route>
    //           <Route path="/login" element={<Login />}></Route>
    //           <Route path="signup" element={<SignUp />} />
    //           <Route path="/" element={<Home />}></Route>
    //           <Route path="/festivals/:id" element={<Festival />}></Route>
    //         </Routes>
    //       </div>

    //       <Footer />
    //     </div>

    //   </Router>
    // </>


  );
}

export default App;
