import React from 'react';
// import logo from './logo.svg';
// import './App.css';
// ---
import Footer from './components/Footer';
import Header from './components/Header';
import ListRooms from './components/ListRooms';
import ListRoomsByPosition from './components/ListRoomsByPosition';
function App() {
  return (
    <>
      <Header></Header>
      <ListRoomsByPosition></ListRoomsByPosition>
      <ListRooms></ListRooms>
      <Footer></Footer>
    </>
  );
}

export default App;
