import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'hooks/hooks'
import { getUserByIdForProfile, putUserEditForProfile, postAvatarUserEditProfile, getInfoUserAfterUpAvt } from 'store/slices/UserSlices'
import { Outlet } from 'react-router-dom'
import '../styles/pages/_profile.scss'

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
        // setAvatar(formData.get('formFile') as File);
    }

    // useEffect(() => {
    //     dispatch(getInfoUserAfterUpAvt())
    // },[dispatch])

    // const handleSubmitEditAvatar = () => {
    //     if(isPosAvatarFulfulled){
    //         dispatch(newProfileUser)
    //     }
    // }
    return (
        <>
            <div id='profile_'>
                <div className='profile_content_left'>
                    <h1>Block left</h1>
                    <div className='profile_content_info'>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <img src={profileUser.avatar} alt="" width={100}
                                height={100} />
                            {statusEditAvatar ? <> <form >
                                <label htmlFor="avatarE">Choose a profile picture:</label>
                                <input type="file"
                                    multiple
                                    onChange={handleAvatar}
                                    id="avatarE" name="avatarE"
                                    accept="image/png, image/jpeg"></input>
                                {/* <button type='submit'>Save</button> */}
                            </form> </> : ""}
                        </div>
                        <div className='content_info_button'><button onClick={handleEditAvatar}>Edit</button></div>
                    </div>
                </div>
                <div className='profile_content_right'>
                        
                    
                    <div>
                        <div>
                            <div className='profile_content_info'>
                                <div>
                                    <h3>Name: {profileUser.name}</h3>
                                    {statusEditName ? <> <form onSubmit={handleSubmitEditName}>
                                        <input type="text" onChange={handleName} />
                                        <button type='submit'>Save</button>
                                    </form> </> : ""}
                                </div>
                                <div className='content_info_button'><button onClick={handleEditName}>Edit</button></div>
                            </div>
                            
                            <div className='profile_content_info'>
                                <div>
                                    <h3>Email: {profileUser.email}</h3>
                                </div>
                                <div className='content_info_button'><button disabled>Edit</button></div>
                            </div>
                            
                            <div className='profile_content_info'>
                                <div>
                                    <h3>Phone: {profileUser.phone}</h3>
                                    {statusEditPhone ? <> <form onSubmit={handleSubmitEditPhone}>
                                        <input type="text" onChange={handlePhone} />
                                        <button type='submit'>Save</button>
                                    </form> </> : ""}
                                </div>
                                <div className='content_info_button'><button onClick={handleEditPhone}>Edit</button></div>
                            </div>
                            
                            <div className='profile_content_info'>
                                <div>
                                    <h3>Birthday: {profileUser.birthday}</h3>
                                    {statusEditBirthday ? <> <form onSubmit={handleSubmitEditBirthday}>
                                        <input type="text" onChange={handleBirthday} />
                                        <button type='submit'>Save</button>
                                    </form> </> : ""}
                                </div>
                                <div className='content_info_button'><button onClick={handleEditBirthday}>Edit</button></div>
                            </div>

                        </div>
                    </div> 
                    
                </div>
            </div>

        </>
    )
}
