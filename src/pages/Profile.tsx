import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'hooks/hooks'
import { getUserByIdForProfile, putUserEditForProfile } from 'store/slices/UserSlices'

export default function Profile() {
    const dispatch = useAppDispatch();

    const { userCurrent } = useAppSelector((state: any) => {
        return state.auth;
    })
    const { isGetProfileUser, profileUser } = useAppSelector((state: any) => {
        return state.user
    })

    const [statusEdit, setStatusEdit] = useState(false)
    const [name, setName] = useState('');


    const { user } = userCurrent;
    console.log(user.id);
    localStorage.setItem('idUser', user.id);
    useEffect(() => {
        dispatch(getUserByIdForProfile(user.id))
    }, [dispatch])

    const handleEdit = () => {
        setStatusEdit(true)
    }
    const handleName = (event: any) => {
        setName(event.target.value)
    }

    const handleSubmitEdit = () => {
        setStatusEdit(false)
        const newProfile = { ...profileUser }
        newProfile.name = name;

        const { id } = user
        // name đã lấy được name
        // console.log(id, newProfile);
        
        dispatch(putUserEditForProfile(newProfile))
    }

    return (
        <>
            <div>
                <div>
                    <div>Name: {profileUser.name}</div>
                    <div><button onClick={handleEdit}>Edit</button></div>
                    {statusEdit ? <> <form onSubmit={handleSubmitEdit}>
                        <input type="text" onChange={handleName} />
                        <button type='submit'>Save</button>
                    </form> </> : ""}
                </div>

            </div>
            <div>{profileUser.email}</div>
            <div>{profileUser.phone}</div>
            <div>{profileUser.birthday}</div>
            <div>{profileUser.avatar}</div>
        </>
    )
}
