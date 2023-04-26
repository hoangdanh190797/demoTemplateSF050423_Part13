import React from 'react';
// import logo from './logo.svg';
// import './App.css';
// ---
import { Route, Routes } from "react-router-dom";
import { useAppDispatch, useAppSelector } from 'hooks/hooks'
import { Outlet, Navigate } from 'react-router-dom'

import HomeTemplate from './template/HomeTemplate';
import Home from './pages/Home';
import SignIn from 'pages/SignIn';
import SignUp from 'pages/SignUp';
import YourTrip from 'pages/YourTrip';
import Profile from 'pages/Profile';
import DetailRoom from 'pages/DetailRoom';
import SearchRoomByLocation from 'pages/SearchRoomByLocation';
import ProtectedTemplate from 'template/ProtectedTemplate';
import PageAdmin from 'pages/PageAdmin';
import UserManagement from 'components/Management/UserManagement';
import LocationManagement from 'components/Management/LocationManagement';
import RoomsManagement from 'components/Management/RoomsManagement';
import BookingManagement from 'components/Management/BookingManagement';
import AddUserManagement from 'components/Management/AddUserManagement';
import AddandEditLocationManagement from 'components/Management/AddandEditLocationManagement';
import AddandEditRoomManagement from 'components/Management/AddandEditRoomManagement';
import AddandEditBookingManagement from 'components/Management/AddandEditBookingManagement';


function App() {
  const { isStatusSignin, userCurrent } = useAppSelector((state: any) => {
    return state.auth
})
  const isRole = userCurrent?.user?.role;
  return (
    <Routes>
      <Route path='/' element={<HomeTemplate />}>
        <Route index element={<Home />} />
        <Route path='profile' element={<Profile />} />
        <Route path='yourtrip' element={<YourTrip />} />
        <Route path='signin' element={<SignIn />} />
        <Route path='signup' element={<SignUp />} />
        <Route path='detailRoom/:idRoom' element={<DetailRoom />} />
        <Route path='roomsByLocation/:idLocation' element={<SearchRoomByLocation />} />
      </Route >
      {/* --- */}
      <Route path='admin' element={<ProtectedTemplate isAuth={isRole} component={<PageAdmin />} />}>
          <Route path='userManagement' element={<UserManagement />} />
          <Route path='userManagement/addUserManagement/:idUser' element={<AddUserManagement />} />
          <Route path='locationManagement' element={<LocationManagement />} />
          <Route path='locationManagement/addAndeditLocationManagement/:idLocation' element={<AddandEditLocationManagement />} />
          <Route path='roomsManagement' element={<RoomsManagement />} />
          <Route path='roomsManagement/addAndeditRoomManagement/:idRoom' element={<AddandEditRoomManagement/>}/>
          <Route path='bookingManagement' element={<BookingManagement />} />
          <Route path='bookingManagement/addAndeditBookingManagement/:idBooking' element={<AddandEditBookingManagement />} />
      </Route>

      {/* Catch all */}
      {/* <Route path='*' element={<404></404>}/> */}
    </Routes>
  );
}

export default App;
