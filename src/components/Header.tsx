import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import logoPNG from '../assets/images/logoPNG.png';
import menuSVG from '../assets/images/menuSVG.svg'
import vietnam from "../assets/images/vietnam.svg";
import cartSVG from '../assets/images/cartSVG.svg'
import { signOut } from '../store/slices/AuthSlices'
import { getInfoUserAfterUpAvt, getUserByIdForProfile } from '../store/slices/UserSlices'

import type { MenuProps } from 'antd';
import { Button, Dropdown, Space } from 'antd';
import { useNavigate, Link } from "react-router-dom";

import ButtonAddToHomeScreen from './ButtonAddToHomeScreen'

interface IBeforeInstallPromptEvent extends Event {
    readonly platforms: string[];
    readonly userChoice: Promise<{
        outcome: "accepted" | "dismissed";
        platform: string;
    }>;
    prompt(): Promise<void>;
}


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

    const { isStatusSignin, userCurrent, roleUser } = useAppSelector((state: any) => {
        return state.auth
    })
    const { isPosAvatarFulfulled, newProfileUser, profileUser } = useAppSelector((state: any) => {
        return state.user
    })

    useEffect(() => {
        let idUser = localStorage.getItem('idUser')
        if (isPosAvatarFulfulled) {
            dispatch(getUserByIdForProfile(idUser))
        }
        dispatch(getInfoUserAfterUpAvt())
    }, [dispatch])

    const items: MenuProps['items'] = [
        {
            key: '0',
            label: (
                <div className=''>
                    {isStatusSignin ? <div className='h-[40px] w-full'><span className='text-[#000000]'>Tài khoản của tôi</span></div> : <div className='h-[40px] w-full text-[#000000] enable:hover'><span>My booking</span></div>}
                </div>
            ),
        },
        {
            key: '1',
            label: (
                <div className=''>
                    {userCurrent?.user?.role === 'ADMIN' ? <Link to={'/admin'}><div className='h-[40px] w-full'>Admin</div></Link> : <div></div>}
                </div>
            ),
        },
        {
            key: '2',
            label: (
                <div>
                    {isStatusSignin ? <Link to={'/yourtrip'}><div className='h-[40px] w-full'>Đơn đặt chỗ của tôi</div></Link> : <div className='h-[40px] w-full'>
                        Đăng nhập
                    </div>}
                </div>

            ),
        },
        {
            key: '3',
            label: (
                <div>
                    {isStatusSignin ? <Link to={'/profile'}><div className='h-[40px] w-full'>Hồ sơ chỗ của tôi</div></Link> : <Button className='text-blue-600 border-blue-600 h-[40px] w-[100%] hover:text-white hover:bg-blue-600'>Đăng nhập</Button>}
                </div>
            ),
        },
        {
            key: '4',
            label: (
                <div>
                    {isStatusSignin ? <Button onClick={() => { dispatch(signOut()); navigate('/') }} className='text-white-600 bg-blue-600 border-none h-[40px] w-[100%] hover:text-white'>Thoát</Button> : <Button className='text-white-600 bg-blue-600 border-none h-[40px] w-[100%] hover:text-white'>Tạo tài khoản</Button>}
                </div>
            ),
        },
        {
            key: '5',
            label: (
                <div className='h-[40px] w-full'>
                    Cài đặt
                </div>
            ),
        },
        {
            key: '6',
            label: (
                <div className='h-[20px] w-full'>
                    <img src={vietnam} alt="" className='w-[20px] h-[20px] bg-cover bg-no-repeat bg-center' />
                </div>
            ),
        },
        {
            key: '7',
            label: (
                <div className='h-[40px] w-full'>
                    đ Đồng Việt Nam
                </div>
            ),
        },
        {
            key: '8',
            label: (
                <div className='h-[80px] w-[100%] text-center'>
                    <span className='text-[#737373] '>GHI DANH NƠI BẠN Ở TRÊN AGODA</span>
                    <br />
                    <span className='text-[#737373] '>Hãy kiếm tiền để trả cho <br /> chuyến đi của bạn!</span>
                    <br />
                    <span className='text-left text-red-600'>Đăng ký cho thuê nhà</span>
                </div>
            ),
        },
    ];
    return (
        <div className='h-[60px] flex justify-around items-center border border-[1px]'>
            <div className='flex justify-around w-7/12'>
                <div className='w-2/12 flex justify-center'>
                    <Link to={`/`}>
                        <img src={logoPNG} alt="logoImg" />
                    </Link>
                </div>
                <div className='w-10/12 flex justify-around items-center font-medium'>
                    <span>Máy bay + K.sạn</span>
                    <span>Chỗ ở</span>
                    <span>Chuyến bay</span>
                    <div className='relative'>
                        <div className='absolute top-[-80%] left-0 bg-red-600 text-white px-0.5'>
                            Mới!
                        </div>
                        <div>
                            Phiếu giảm giá và ưu đãi</div>
                    </div>
                    <span>Căn hộ</span>
                    <div className='relative'>
                        <div className='absolute top-[-80%] left-0 bg-red-600 text-white px-0.5'>
                            Mới!
                        </div>
                        <div>
                            Hoạt động</div>
                    </div>
                    <span>...</span>
                </div>

            </div>

            <div className='flex justify-around items-center w-5/12'>
                <div>
                    <Button className='text-red-600 border-red-600 hover:text-white hover:bg-red-600'>Đăng ký cho thuê nhà</Button>
                </div>

                <div>
                    <button>
                        <img src={vietnam} alt="" width={25} />
                    </button>
                </div>

                <div>
                    {isStatusSignin ?
                        <div>
                            {isPosAvatarFulfulled ? <img className='rounded-[100%]' src={profileUser?.avatar} alt='ImageER' width={40} /> : <div>
                                <img style={{ borderRadius: '100%' }} src={userCurrent?.user?.avatar} alt='ImageER' width={40} />
                            </div>}
                        </div>
                        :
                        <div className='flex justify-around items-center w-full'>
                            <div>
                                <Button className='text-blue-600 border-none hover:bg-blue-600 hover:text-white'><Link to={'/signin'}>Đăng nhập</Link> </Button>
                            </div>
                            <div>
                                <Button className='text-blue-600 border-blue-600 hover:text-white hover:bg-blue-600'><Link to={'/signup'}>Tạo tài khoản</Link></Button>
                            </div>
                        </div>}
                </div>

                <div>
                    <button>
                        <img src={cartSVG} alt="" width={25} />
                    </button>
                </div>
                <div>

                    <button>
                        <div>
                            <div>
                                <Space wrap>
                                    <Dropdown menu={{ items }} placement="bottomLeft">
                                        <Button><img src={menuSVG} alt="" /></Button>
                                    </Dropdown>
                                </Space>

                                {/* <Button
                                        id="basic-button"
                                        aria-controls={open ? 'basic-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                        onClick={handleClick}
                                    >
                                        <div>
                                            <img src={threesf} alt="" width={25} />
                                        </div>



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
                                                <div>
                                                    <MenuItem onClick={handleClose}>
                                                        <Link to={'/profile'}>Profile</Link>
                                                    </MenuItem>
                                                    <MenuItem onClick={handleClose}>
                                                        <Link to={'/yourtrip'}>Your trip</Link>
                                                    </MenuItem>
                                                    {userCurrent?.user?.role === 'ADMIN' ?
                                                        <MenuItem onClick={handleClose}>
                                                            <Link to={'/admin'}>Admin</Link>
                                                        </MenuItem> :
                                                        <div></div>}
                                                    <MenuItem onClick={handleClose}>
                                                        <button onClick={() => { dispatch(signOut()); navigate('/') }}>Sign Out</button>
                                                    </MenuItem>
                                                </div> :
                                                <div>
                                                    <MenuItem onClick={handleClose}>
                                                        <Link to={'/signin'}>Sign in</Link>
                                                    </MenuItem>
                                                    <MenuItem onClick={handleClose}>
                                                        <Link to={'/signup'}>Sign up</Link>
                                                    </MenuItem>
                                                </div>}
                                        </div>
                                    </Menu> */}
                            </div>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    )
}
