import React from 'react'
import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { postUserSignup } from '../../store/slices/AuthSlices'
import { useParams, useNavigate, Link, NavLink } from "react-router-dom";
import { getUserByIdForProfile, putUserEditForProfile, putUserEditForManagement } from '../../store/slices/UserSlices'



export default function AddUserManagement() {
    const dispatch = useAppDispatch()
    //Khả năng cao là mình lấy được cái id trước, việc bất đồng bộ nó chạy trước
    //sau đó useEffect nó mới chạy lần nữa thì data lần này mới về mà nó về chứ
    //nó chưa được render lên => Giả thuyết này đúng nhưng không phải trường hợp
    //của mình lí do Redux đã nhận về dữ liệu
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
                        <select name="gender" value={values.gender} onChange={handleInputChange}>
                            <option value='true'>Nam</option>
                            <option value='false'>Nữ</option>
                        </select>
                    </fieldset>
                    <fieldset>
                        <label htmlFor="">Loại người dùng: </label>
                        <select name="role" value={values.role} onChange={handleInputChange}>
                            <option value="USER">User</option>
                            <option value="ADMIN">Admin</option>
                        </select>
                    </fieldset>
                    <button type='submit'>Tạo</button>
                </form>
            </div>
        </>
    )
}
