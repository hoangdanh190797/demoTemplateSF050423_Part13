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
                            <Link to='userManagemet'>
                                <h2>Quản lý người dùng</h2>
                            </Link>
                        </div>
                        <div className='tagRoute_'>
                            <Link to='locationManagemet'>
                                <h2>Quản lý thông tin vị trí</h2>
                            </Link>
                        </div>
                        <div className='tagRoute_'>
                            <Link to='roomsManagemet'>
                                <h2>Quản lý thông tin phòng</h2>
                            </Link>
                        </div>
                        <div className='tagRoute_'>
                            <Link to='bookingManagemet'>
                                <h2>Quản lý đặt phòng</h2>
                            </Link>
                        </div>
                    </div>
                </div>
                <div style={{ width: '80%' }}>
                    <div className='adminPage_title'>
                        <h1>HEADER</h1>
                    </div>
                    <div>
                        <Outlet></Outlet>
                    </div>
                </div>
            </div>
        </div>
    )
}
