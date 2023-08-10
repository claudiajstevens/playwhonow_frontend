import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';

import Searcher from './components/Searcher';
import NavBar from './components/NavBar';
import Hero from './components/Hero/Hero';
import Home from './views/Home';
import Profile from './views/Profile';


function App() {

  return (
    <div>
        <Router>
        <NavBar />

        <Routes>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </Router>
    </div>


  );
}

export default App;
