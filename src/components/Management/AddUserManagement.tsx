import React from 'react'
import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { postUserSignup } from '../../store/slices/AuthSlices'
import { useParams, useNavigate, Link, NavLink } from "react-router-dom";
import { getUserByIdForProfile, putUserEditForProfile } from '../../store/slices/UserSlices'


export default function AddUserManagement() {
    const dispatch = useAppDispatch()
    const { idUser } = useParams<any>();
    const newID: any = idUser;
    let idUserNum = parseInt(newID)

    useEffect(() => {
        dispatch(getUserByIdForProfile(idUserNum));
    }, [dispatch])
    
    const { isGetProfileUser, profileUser } = useAppSelector((state: any) => {
        return state.user
    })

    useEffect(()=>{
        setValues(profileUser) 
    },[])

    // const initialValues = {
    //     id: '0',
    //     name: '',
    //     email: '',
    //     password: '',
    //     phone: '',
    //     birthday: '',
    //     gender: true,
    //     role: '',
    // };
    const [values, setValues] = useState<any>(profileUser)
    
    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    console.log(values)

    const handleSubmitAddUser = (event: any) => {
        event.preventDefault();
        if (idUserNum === 0) {
            dispatch(postUserSignup(values))
        }
        else{
            dispatch(putUserEditForProfile(values))

        }
    }

    return (
        <div>
            <form onSubmit={handleSubmitAddUser}>
                <h1>THÊM QUẢN TRỊ VIÊN</h1>
                <fieldset>
                    <label htmlFor="">Tên: </label>
                    <input
                        onChange={handleInputChange}
                        value={values.name}
                        type="text"
                        name="name"
                        id=""
                        placeholder='Tên' />
                </fieldset>
                <fieldset>
                    <label htmlFor="">Email: </label>
                    <input
                        name="email"
                        onChange={handleInputChange}
                        value={values.email}
                        type="text"
                        id=""
                        placeholder='Email' />
                </fieldset>
                <fieldset>
                    <label htmlFor="">Mật khẩu: </label>
                    <input
                        name="password"
                        onChange={handleInputChange}
                        value={values.password} type="text" id="" placeholder='Mật khẩu' />
                </fieldset>
                <fieldset>
                    <label htmlFor="">Số điện thoại: </label>
                    <input
                        name="phone"
                        onChange={handleInputChange}
                        value={values.phone}
                        type="text" id="" placeholder='Số điện thoại' />
                </fieldset>
                <fieldset>
                    <label htmlFor="">Ngày tháng năm sinh: </label>
                    <input
                        name="birthday"
                        onChange={handleInputChange}
                        value={values.birthday}
                        type="text" id="" placeholder='Ngày tháng năm sinh' />
                </fieldset>
                <fieldset>
                    <label htmlFor="">Giới tính: </label>
                    <select name="gender" onChange={handleInputChange}>
                        <option value="true">Nam</option>
                        <option value="false">Nữ</option>
                    </select>
                </fieldset>
                <fieldset>
                    <label htmlFor="">Loại người dùng: </label>
                    <select name="role" onChange={handleInputChange}>
                        <option value="USER">User</option>
                        <option value="ADMIN">Admin</option>
                    </select>
                </fieldset>
                <button type='submit'>Tạo</button>
            </form>
        </div>
    )
}
