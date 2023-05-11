import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'hooks/hooks'
import { getUserByIdForProfile, putUserEditForProfile, postAvatarUserEditProfile, getInfoUserAfterUpAvt } from 'store/slices/UserSlices'
import { Outlet } from 'react-router-dom'
import { Button, Space } from 'antd';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { useNavigate, Link } from "react-router-dom";

import { Input } from 'antd';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';

import { CheckCircleTwoTone } from '@ant-design/icons';
import dayjs from 'dayjs';




import '../styles/pages/_profile.scss';

export default function Profile() {
    const dispatch = useAppDispatch();

    const { userCurrent } = useAppSelector((state: any) => {
        return state.auth;
    })
    const { isGetProfileUser, profileUser, isPosAvatarFulfulled, newProfileUser } = useAppSelector((state: any) => {
        return state.user
    })

    const { user } = userCurrent;
    // localStorage.setItem('idUser', user.id);
    useEffect(() => {
        dispatch(getUserByIdForProfile(user?.id))
    }, [dispatch])

    // Name
    const [name, setName] = useState('');
    const [statusEditName, setStatusEditName] = useState(false)
    const handleEditName = () => {
        setStatusEditName(true)
    }
    const handleName = (event: any) => {
        setName(event.target.value)
    }
    const handleSubmitEditName = () => {
        setStatusEditName(false)
        const newProfile = { ...profileUser }
        newProfile.name = name;
        dispatch(putUserEditForProfile(newProfile))
    }
    //Phone
    const [phone, setPhone] = useState('');
    const [statusEditPhone, setStatusEditPhone] = useState(false)
    const handleEditPhone = () => {
        setStatusEditPhone(true)
    }
    const handlePhone = (event: any) => {
        setPhone(event.target.value)
    }
    const handleSubmitEditPhone = () => {
        setStatusEditPhone(false)
        const newProfile = { ...profileUser }
        newProfile.phone = phone;
        dispatch(putUserEditForProfile(newProfile))
    }
    //Birthday
    const [birthday, setBirthday] = useState('');
    const [statusEditBirthday, setStatusEditBirthday] = useState(false)
    const handleEditBirthday = () => {
        setStatusEditBirthday(true)
    }
    const handleBirthday = (event: any) => {
        setBirthday(event.target.value)
    }
    const handleSubmitEditBirthday = () => {
        setStatusEditBirthday(false)
        const newProfile = { ...profileUser }
        newProfile.birthday = birthday;
        dispatch(putUserEditForProfile(newProfile))
    }
    //Avatar
    const [avatar, setAvatar] = useState<null | File>(null);
    const [statusEditAvatar, setStatusEditAvatar] = useState(false)
    const handleEditAvatar = () => {
        setStatusEditAvatar(true)
    }

    const handleAvatar = (event: any) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('formFile', file, file.name);
        dispatch(postAvatarUserEditProfile(formData))
    }

    const items: TabsProps['items'] = [
        {
            key: '1',
            label:
                <Link to={'/yourtrip'}>
                    <div className='flex flex-row items-center hover:text-white hover:bg-[#669efa] px-10 h-[40px]'>
                        <AssignmentTurnedInIcon className='mr-2'></AssignmentTurnedInIcon>
                        <span className='text-[15px] font-[700] leading-2'>Đơn đặt chỗ của tôi</span>
                    </div>
                </Link>
            ,
            children:'',
        },
        {
            key: '2',
            label:
                <Link to={'/profile'}>
                    <div className='flex flex-row items-center hover:text-white hover:bg-[#669efa] px-10 h-[40px]'>
                        <PermIdentityIcon className='mr-2'></PermIdentityIcon>
                        <span className='text-[15px] font-[700] leading-2'>Hồ sơ của tôi</span>
                    </div>
                </Link>,
            children: <div id='profile_'>
                <div className='profile_content_left'>
                    <div className=''>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <div>
                                <img style={{ width: '150px', height: '150px', borderRadius: '100%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', margin: '40px auto', }} src={profileUser.avatar} alt="" width={100}
                                    height={100} />
                                <div>
                                    {statusEditAvatar ? <> <form>
                                        <label style={{ display: 'flex', justifyContent: 'center' }} htmlFor="avatarE">Chọn một ảnh từ máy tính của bạn:</label>
                                        <input type="file"
                                            multiple
                                            onChange={handleAvatar}
                                            id="avatarE" name="avatarE"
                                            accept="image/png, image/jpeg"></input>
                                        {/* <button type='submit'>Lưu</button> */}
                                    </form> </> : ""}
                                </div>
                            </div>
                        </div>
                        <div className='content_info_button_left'>
                            <button className='profile_content_btn_img' style={{ backgroundColor: 'rgb(252 78 113)', marginTop: '20px', height: '40px', width: '120px', borderRadius: '0.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={handleEditAvatar}>Cập nhật ảnh</button>
                        </div>
                    </div>
                </div>
                <div className='profile_content_right'>
                    <div>
                        <div>
                            <div className='profile_content_info'>
                                <div>
                                    <h2 style={{ fontWeight: '500' }}>Họ và tên</h2>
                                    <h3>{profileUser.name}</h3>
                                    {statusEditName ? <> <form onSubmit={handleSubmitEditName}>
                                        <Input type="text" onChange={handleName} />
                                        <button type='submit'>Lưu</button>
                                    </form> </> : ""}
                                </div>
                                <div className='content_info_button'><Button onClick={handleEditName}>Thay đổi</Button></div>
                            </div>

                            <div className='profile_content_info'>
                                <div>
                                    <h2 style={{ fontWeight: '500' }}>Địa chỉ email</h2>
                                    <h3>{profileUser.email}</h3>
                                </div>
                                <div className='content_info_button'><Button disabled>Thay đổi</Button></div>
                            </div>

                            <div className='profile_content_info'>
                                <div>
                                    <h2 style={{ fontWeight: '500' }}>Số điện thoại</h2>
                                    <h3>{profileUser.phone}</h3>
                                    {statusEditPhone ? <> <form onSubmit={handleSubmitEditPhone}>
                                        <Input type="text" onChange={handlePhone} />
                                        <button type='submit'>Lưu</button>
                                    </form> </> : ""}
                                </div>
                                <div className='content_info_button'><Button onClick={handleEditPhone}>Thay đổi</Button></div>
                            </div>

                            <div className='profile_content_info'>
                                <div>
                                    <h2 style={{ fontWeight: '500' }}>Ngày sinh</h2>
                                    <h3>{profileUser.birthday}</h3>
                                    {statusEditBirthday ? <> <form onSubmit={handleSubmitEditBirthday}>
                                        <Input type="text" onChange={handleBirthday} />
                                        <button type='submit'>Lưu</button>
                                    </form> </> : ""}
                                </div>
                                <div className='content_info_button'><Button onClick={handleEditBirthday}>Thay đổi</Button></div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>,
        },
        {
            key: '3',
            label: `Tab 3`,
            children: `Content of Tab Pane 3`,
        },
    ];

    return (
        <>
            <h1 className='ml-72'>Thông tin người dùng</h1>
            {/*  */}
            <div className='w-full mx-auto'>
                <Tabs
                    tabPosition='left'
                    defaultActiveKey="2"
                    items={items}
                    tabBarStyle={{ marginLeft: '10%', width: '15%', marginRight: '0px', paddingRight: '0px' }}
                />
            </div>
        </>
    )
}
