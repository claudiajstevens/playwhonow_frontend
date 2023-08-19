import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';

import Searcher from './components/Searcher';
import NavBar from './components/NavBar';
import Hero from './components/Hero/Hero';
import Home from './views/Home';
import Profile from './views/Profile';
import { useLocalState } from './util/useLocalStorage';
import Login from './components/Login';
import PrivateRoute from './PrivateRoute/PrivateRoute';


function App() {
  // may want to save jwt in cookie instead of local storage
  const [jwt, setJwt] = useLocalState("", "jwt");


  // fetch("/auth/register", {
  //   headers: {
  //     "Content-Type": "application/json"
  //   },
  //   method: "post",
  //   body: JSON.stringify(reqBody)
  // });

  // fetch returns a promise
  // the array of the second argument is dependencies 
  // useEffect( () => {
  //   if( !jwt ){
  //     const  reqBody = {
  //       "username": "cloud",
  //       "password": "password"
  //     };

  //     fetch("/auth/login", {
  //       headers: {
  //         "Content-Type": "application/json"
  //     },
  //     method: "post",
  //     body: JSON.stringify(reqBody)
  //     })
  //     .then(response => Promise.all([response.json(), response.headers]))
  //     .then(([body, headers]) => {
  //       setJwt(body.jwt);  
  //     });
  //   }

  // }, []);

  useEffect( () => {
    console.log(`JWT is: ${jwt}`);
  }, [jwt]);


  //adding connection to spring boot application
  // fetch returns a promise
  // useEffect( () => {
  //   fetch('/hello?name="Cloud"')
  //   .then(response=>response.text())
  //   .then(result=>console.log(result));
  // }, []);

  return (
    <div>
        <Router>
        <NavBar />

        <Routes>
          <Route path="/profile" element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </Router>
    </div>


  );
}

export default App;
