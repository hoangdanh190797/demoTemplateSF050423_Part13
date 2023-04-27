import React from 'react'
import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { postUserSignup } from '../../store/slices/AuthSlices'
import { useParams, useNavigate, Link, NavLink } from "react-router-dom";
import { getUserByIdForProfile, putUserEditForProfile, putUserEditForManagement } from '../../store/slices/UserSlices'



export default function AddUserManagement() {
    const dispatch = useAppDispatch()
    let { idUser } = useParams<any>();
    let newID: any = idUser;
    let idUserNum = parseInt(newID)

    localStorage.setItem('idUserEdit', newID);

    useEffect(() => {
        if (idUser) {
            dispatch(getUserByIdForProfile(idUserNum));
        }
    }, [])

    const { isGetProfileUser, profileUser } = useAppSelector((state: any) => {
        return state.user
    })

    const initialValues = {
        id: '0',
        name: '',
        email: '',
        password: '',
        phone: '',
        birthday: '',
        gender: true,
        role: '',
    };

    const [values, setValues] = useState<any>(initialValues)

    useEffect(() => {
        if (isGetProfileUser) {
            setValues(profileUser)
        }
    }, [isGetProfileUser, profileUser])

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    const handleSubmitAddUser = (event: any) => {
        event.preventDefault();
        if (idUserNum === 0) {
            dispatch(postUserSignup(values))
        }
        else {
            dispatch(putUserEditForManagement(values))
        }
    }

    return (
        <>
            <div>
                <form style={{ fontWeight: '600'}} onSubmit={handleSubmitAddUser}>
                    <h1>THÊM NGƯỜI DÙNG</h1>
                    <div style={{width:'40%', margin:'0px auto'}}>
                        <fieldset style={{display:'flex', justifyContent:'space-between'}}>
                            <label htmlFor="">Tên: </label>
                            <input
                                onChange={handleInputChange}
                                value={values.name}
                                type="text"
                                name="name"
                                id=""
                                placeholder='Tên' />
                        </fieldset>
                        <fieldset style={{display:'flex', justifyContent:'space-between'}}>
                            <label htmlFor="">Email: </label>
                            <input
                                disabled
                                name="email"
                                onChange={handleInputChange}
                                value={values.email}
                                type="text"
                                id=""
                                placeholder='Email' />
                        </fieldset>
                        <fieldset style={{display:'flex', justifyContent:'space-between'}}>
                            <label htmlFor="">Mật khẩu: </label>
                            <input
                                disabled
                                name="password"
                                type='password'
                                onChange={handleInputChange}
                                value={values.password}
                                id="" 
                                // placeholder='Mật khẩu' 
                                />
                        </fieldset>
                        <fieldset style={{display:'flex', justifyContent:'space-between'}}>
                            <label htmlFor="">Số điện thoại: </label>
                            <input
                                name="phone"
                                onChange={handleInputChange}
                                value={values.phone}
                                type="text" id="" placeholder='Số điện thoại' />
                        </fieldset>
                        <fieldset style={{display:'flex', justifyContent:'space-between'}}>
                            <label htmlFor="">Ngày tháng năm sinh: </label>
                            <input
                                name="birthday"
                                onChange={handleInputChange}
                                value={values.birthday}
                                type="text" id="" placeholder='Ngày tháng năm sinh' />
                        </fieldset>
                        <fieldset style={{display:'flex', justifyContent:'space-between'}}>
                            <label htmlFor="">Giới tính: </label>
                            <select name="gender" value={values.gender} onChange={handleInputChange}>
                                <option value='true'>Nam</option>
                                <option value='false'>Nữ</option>
                            </select>
                        </fieldset>
                        <fieldset style={{display:'flex', justifyContent:'space-between'}}>
                            <label htmlFor="">Loại người dùng: </label>
                            <select name="role" value={values.role} onChange={handleInputChange}>
                                <option value="USER">User</option>
                                <option value="ADMIN">Admin</option>
                            </select>
                        </fieldset>
                        <button style={{ height: '30px', width: '60px', backgroundColor: '#fc4e71', borderRadius: '0.25rem', fontWeight: '500' }} type='submit'>Lưu</button>
                    </div>

                </form>
            </div>
        </>
    )
}
