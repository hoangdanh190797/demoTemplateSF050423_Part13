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
                <div style={{ }}>
                    <img style={{width:'200px', height:'200px', margin:'20px auto'}} src={values.hinhAnh} alt="" />
                    <div className='content_info_button'><button style={{ margin: '15px auto', backgroundColor: 'rgb(252 78 113)', marginTop: '20px', height: '40px', width: '120px', borderRadius: '0.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={handleEditAvatar}>Cập nhật ảnh</button></div>
                    {statusEditAvatar ? <> <form onSubmit={handleSubmitEditAvatar}>
                        <label htmlFor="avatarE">Chọn một ảnh từ máy tính của bạn:</label>
                        <input type="file"
                            multiple
                            onChange={handleAvatar}
                            id="avatarE" name="avatarE"
                            accept="image/png, image/jpeg"></input>
                    </form> </> : ""}
                </div>
                <form style={{width:'30%', margin:'0px auto'}} onSubmit={handleSubmitAddLocation}>
                    <h1>THÊM VỊ TRÍ</h1>
                    <fieldset style={{display:'flex', justifyContent:'space-between'}}>
                        <label htmlFor="">Tên vị trí: </label>
                        <input
                            onChange={handleInputChange}
                            value={values.tenViTri}
                            type="text"
                            name="tenViTri"
                            id=""
                            placeholder='Tên vị trí' />
                    </fieldset>
                    <fieldset style={{display:'flex', justifyContent:'space-between'}}>
                        <label htmlFor="">Tỉnh thành: </label>
                        <input
                            name="tinhThanh"
                            onChange={handleInputChange}
                            value={values.tinhThanh}
                            type="text"
                            id=""
                            placeholder='Tình thành' />
                    </fieldset>
                    <fieldset style={{display:'flex', justifyContent:'space-between'}}>
                        <label htmlFor="">Quốc gia: </label>
                        <input
                            name="quocGia"
                            onChange={handleInputChange}
                            value={values.quocGia}
                            type="text"
                            id=""
                            placeholder='Quốc gia' />
                    </fieldset>
                    <button style={{ height: '30px', width: '60px', backgroundColor: '#fc4e71', borderRadius: '0.25rem', fontWeight: '500' }}  type='submit'>Lưu</button>
                </form>
            </div>
        </>
    )
}
