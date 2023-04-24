import React, { useEffect, useState } from 'react'
import logoPNG from '../assets/images/logoPNG.png';
import global from '../assets/images/global.svg'
import threesf from '../assets/images/threesf.svg'
import person from '../assets/images/person.svg'
import { useParams, useNavigate, Link, NavLink } from "react-router-dom";
import { signOut } from '../store/slices/AuthSlices'
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import '../styles/components/_header.scss'
import { set } from 'lodash';

export default function Header() {
    const navigate = useNavigate();

    const dispatch = useAppDispatch();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const { isStatusSignin, userCurrent } = useAppSelector((state: any) => {
        return state.auth
    })

    // if (isStatusSignin) {
    //     const { avatar, role } = userCurrent.user;
    // }

    interface UserCurrent {
        user: {
            name: String,
            avatar: String,
            role: String | null,
        },
    }

    const [roleUser, setRoleUser] = useState()

    useEffect(() => {
        setRoleUser(userCurrent?.user?.role)
    })

    // const [dataN, setDataN] = useState<UserCurrent | null | any>(null);
    // const [renderADMIN, setRenderADMIN] = useState<boolean>(false)

    // useEffect(() => {
    //     setDataN(userCurrent)        
    //     if (isStatusSignin) { 
    //     // setDataN(userCurrent)
    //         if (userCurrent?.user?.role === 'ADMIN') { setRenderADMIN(true) } else{ setRenderADMIN(false) }
    //      }
    // }, [setDataN, setRenderADMIN])
    return (
        <>
            <div id='header_'>
                <div className='header_left'>
                    <div className='header_left_box_img'>
                        <Link to={`/`}>
                            <img src={logoPNG} alt="logoImg" />
                        </Link>
                    </div>
                </div>
                <div className='header_center'>
                    <div className='header_center_box_center'>

                        <div>Chỗ ở</div>
                        <div>Trải nghiệm</div>
                        <div>Trải nghiệm trực tuyến</div>
                    </div>

                </div>
                <div className='header_right'>
                    <div className='header_right_title'>
                        <button>Trở thành chủ nhà</button>
                    </div>
                    <div className='header_right_global'>
                        <button>
                            <img src={global} alt="" width={25} />
                        </button>
                    </div>
                    <div className='header_right_login'>
                        {/* <Link to={'/signin'}> */}
                        <button>
                            <div className='header_login_box'>

                                <div>
                                    <Button
                                        id="basic-button"
                                        aria-controls={open ? 'basic-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                        onClick={handleClick}
                                    >
                                        <div>
                                            <img src={threesf} alt="" width={25} />
                                        </div>

                                        {isStatusSignin ? <div>
                                            <img src={userCurrent?.user?.avatar} alt='ImageER' width={25} />
                                        </div> : <div>
                                            <img src={person} alt="" width={25} />
                                        </div>}

                                    </Button>
                                    <Menu
                                        id="basic-menu"
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                        MenuListProps={{
                                            'aria-labelledby': 'basic-button',
                                        }}
                                    >
                                        <div>
                                            {isStatusSignin ? 
                                            <>
                                            <MenuItem onClick={handleClose}>
                                                <Link to={'/profile'}>Profile</Link>
                                            </MenuItem>
                                            <MenuItem onClick={handleClose}>
                                                <Link to={'/yourtrip'}>Your trip</Link>
                                            </MenuItem></> : 
                                            <div>
                                                <MenuItem onClick={handleClose}>
                                                    <Link to={'/signin'}>Sign in</Link>
                                                </MenuItem>
                                                <MenuItem onClick={handleClose}>
                                                    <Link to={'/signup'}>Sign up</Link>
                                                </MenuItem>
                                            </div>}
                                            {roleUser === 'ADMIN' ? 
                                            <div>
                                            <MenuItem onClick={handleClose}>
                                                <Link to={'/admin'}>Admin</Link>
                                            </MenuItem> </div> :
                                            ''}
                                            {
                                            <MenuItem onClick={handleClose}>
                                                <button onClick={() => { dispatch(signOut()); navigate('/') }}>Sign Out</button>
                                            </MenuItem>
                                            }
                                        </div>
                                    </Menu>
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
