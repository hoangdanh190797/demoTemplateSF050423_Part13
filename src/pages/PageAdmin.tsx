import React from 'react'
import { Outlet } from 'react-router-dom'
import { useParams, useNavigate, Link, NavLink } from "react-router-dom";
import '../styles/pages/_adminPage.scss'

export default function PageAdmin() {
    return (
        <div id='adminPage_'>
            <div style={{ display: 'flex', width: '100%' }}>
                <div className='adminPage_block_left_'>
                    <div className='adminPage_title' >
                        <h1>DASHBOARD</h1>
                        
                    </div>
                    <div className='adminPage_tag'>
                        <div className='tagRoute_'>
                            <Link to='userManagement'>
                                <h2>Quản lý người dùng</h2>
                            </Link>
                        </div>
                        <div className='tagRoute_'>
                            <Link to='locationManagement'>
                                <h2>Quản lý thông tin vị trí</h2>
                            </Link>
                        </div>
                        <div className='tagRoute_'>
                            <Link to='roomsManagement'>
                                <h2>Quản lý thông tin phòng</h2>
                            </Link>
                        </div>
                        <div className='tagRoute_'>
                            <Link to='bookingManagement'>
                                <h2>Quản lý đặt phòng</h2>
                            </Link>
                        </div>
                    </div>
                </div>
                <div style={{ width: '80%' }}>
                    <div className='adminPage_title'>
                        <Link to='/'>
                                <h1>Home</h1>
                            </Link>
                    </div>
                    <div>
                        <Outlet></Outlet>
                    </div>
                </div>
            </div>
        </div>
    )
}
