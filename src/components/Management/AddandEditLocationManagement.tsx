import React from 'react'
import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { postUserSignup } from '../../store/slices/AuthSlices'
import { useParams, useNavigate, Link, NavLink } from "react-router-dom";
import { getUserByIdForProfile, putUserEditForProfile, putUserEditForManagement } from '../../store/slices/UserSlices'
import { getLocationByIDManagement } from '../../store/slices/LocationSlices'
import { postLocationManagement, putLocationByIDManagement, postImageForLocation } from '../../store/slices/LocationSlices'



export default function AddandEditLocationManagement() {
    const dispatch = useAppDispatch()
    let { idLocation } = useParams<any>();
    let newID: any = idLocation;
    let idLocationNum = parseInt(newID)

    localStorage.setItem('idLocationEdit', newID);

    useEffect(() => {
        if (idLocation) {
            dispatch(getLocationByIDManagement(idLocationNum));
        }
    }, [])

    const { isGetLocationByIDManagement, locationByIDManagement } = useAppSelector((state: any) => {
        return state.location
    })

    const initialValues = {
        id: '0',
        tenViTri: '',
        tinhThanh: '',
        quocGia: '',
        hinhAnh: '',
    };

    const [values, setValues] = useState<any>(initialValues)

    useEffect(() => {
        if (isGetLocationByIDManagement) {
            setValues(locationByIDManagement)
        }
    }, [isGetLocationByIDManagement, locationByIDManagement])

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    const handleSubmitAddLocation = (event: any) => {
        event.preventDefault();
        if (idLocationNum === 0) {
            dispatch(postLocationManagement(values))
        }
        else {
            dispatch(putLocationByIDManagement(values))
        }
    }

    const [statusEditAvatar, setStatusEditAvatar] = useState(false)
    const handleEditAvatar = () => {
        setStatusEditAvatar(true)
    }
    const handleSubmitEditAvatar = () => { }
    const handleAvatar = (event: any) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('formFile', file, file.name);
        // setAvatar(formData.get('formFile') as File);
        dispatch(postImageForLocation(formData))

    }
    return (
        <>
            <div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <img src={values.hinhAnh} alt="" width={100}
                        height={100} />
                    <div className='content_info_button'><button onClick={handleEditAvatar}>Edit</button></div>
                    {statusEditAvatar ? <> <form onSubmit={handleSubmitEditAvatar}>
                        <label htmlFor="avatarE">Choose a profile picture:</label>
                        <input type="file"
                            multiple
                            onChange={handleAvatar}
                            id="avatarE" name="avatarE"
                            accept="image/png, image/jpeg"></input>
                        <button type='submit'>Save</button>
                    </form> </> : ""}
                </div>
                <form onSubmit={handleSubmitAddLocation}>
                    <h1>THÊM VỊ TRÍ</h1>
                    <fieldset>
                        <label htmlFor="">Tên vị trí: </label>
                        <input
                            onChange={handleInputChange}
                            value={values.tenViTri}
                            type="text"
                            name="tenViTri"
                            id=""
                            placeholder='Tên vị trí' />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="">Tỉnh thành: </label>
                        <input
                            name="tinhThanh"
                            onChange={handleInputChange}
                            value={values.tinhThanh}
                            type="text"
                            id=""
                            placeholder='Tình thành' />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="">Quốc gia: </label>
                        <input
                            name="quocGia"
                            onChange={handleInputChange}
                            value={values.quocGia}
                            type="text"
                            id=""
                            placeholder='Quốc gia' />
                    </fieldset>
                    {/* <fieldset>
                        <label htmlFor="">Hình ảnh: </label>
                        <input
                            name="phone"
                            onChange={handleInputChange}
                            value={values.hinhAnh}
                            type="text" 
                            id="" 
                            placeholder='Hình ảnh' />
                    </fieldset> */}
                    {/* <fieldset>
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
                    </fieldset> */}
                    <button type='submit'>Thêm</button>
                </form>
            </div>
        </>
    )
}
