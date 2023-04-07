import React from 'react';
// import logo from './logo.svg';
// import './App.css';
// ---
import { Route, Routes } from "react-router-dom";
import HomeTemplate from './template/HomeTemplate';
import Home from './pages/Home';
import SignIn from 'pages/SignIn';
import SignUp from 'pages/SignUp';
import Profile from 'pages/Profile';

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomeTemplate />}>
        <Route index element={<Home />} />
        <Route path='profile' element={<Profile/>}/>
        <Route path='signin' element={<SignIn />} />
        <Route path='signup' element={<SignUp />} />
      </Route >
    </Routes>
  );
}

export default App;
