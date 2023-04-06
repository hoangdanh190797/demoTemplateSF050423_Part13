import React from 'react';
// import logo from './logo.svg';
// import './App.css';
// ---
import { Route, Routes } from "react-router-dom";
import HomeTemplate from './template/HomeTemplate';
import Home from './pages/Home';

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomeTemplate />}>
        <Route index element={<Home />} />
        <Route path='detail/:'/>
      </Route >
    </Routes>
  );
}

export default App;
