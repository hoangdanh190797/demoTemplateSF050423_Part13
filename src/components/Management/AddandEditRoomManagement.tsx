import React from 'react'
import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import {
    getRoomByIdForDetail,
    putRoomEditManagement,
    postRoomNewManagement,
    postImageRoomManagement
} from '../../store/slices/RoomSlices';
import { useParams, useNavigate, Link, NavLink } from "react-router-dom";
import { Switch } from 'antd';


export default function AddandEditRoomManagement() {
    const dispatch = useAppDispatch()
    let { idRoom } = useParams<any>();
    let newID: any = idRoom;
    let idRoomNum = parseInt(newID)

    localStorage.setItem('idRoomEdit', newID);

    useEffect(() => {
        if (idRoom) {
            dispatch(getRoomByIdForDetail(idRoomNum));
        }
    }, [])

    //Chỉ cần nạp data vào lại roomDetail vẫn render thông tin cần!
    const { isGetRoomDetail, roomDetail, isPutRoomEditManagement, roomEditManagement } = useAppSelector((state: any) => {
        return state.rooms
    })

    const initialValues = {
        id: '0',
        tenPhong: '',
        khach: '',
        phongNgu: '',
        giuong: '',
        phongTam: '',
        moTa: '',
        giaTien: '',
        mayGiat: false,
        banLa: false,
        tivi: false,
        dieuHoa: false,
        wifi: false,
        bep: false,
        doXe: false,
        hoBoi: false,
        banUi: false,
    };

    const [values, setValues] = useState<any>(initialValues)


    useEffect(() => {
        if (isGetRoomDetail) {
            setValues(roomDetail)
        }
    }, [isGetRoomDetail, roomDetail])

    const handleMayGiat = (checked: boolean) => {
        setValues({
            ...values,
            mayGiat: checked
        })
        console.log(checked);
    }
    const handleBanLa = (checked: boolean) => {
        setValues({
            ...values,
            banLa: checked
        })
    }
    const handleTivi = (checked: boolean) => {
        setValues({
            ...values,
            tivi: checked
        })
    }
    const handleDieuhoa = (checked: boolean) => {
        setValues({
            ...values,
            dieuHoa: checked
        })
    }
    const handleWifi = (checked: boolean) => {
        setValues({
            ...values,
            wifi: checked
        })
    }
    const handleBep = (checked: boolean) => {
        setValues({
            ...values,
            bep: checked
        })
    }
    const handleDoxe = (checked: boolean) => {
        setValues({
            ...values,
            doXe: checked
        })
    }
    const handleHoboi = (checked: boolean) => {
        setValues({
            ...values,
            hoBoi: checked
        })
    }
    const handleBanUi = (checked: boolean) => {
        setValues({
            ...values,
            banUi: checked
        })
    }
    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    const handleSubmitAddLocation = (event: any) => {
        event.preventDefault();
        if (idRoomNum === 0) {
            dispatch(postRoomNewManagement(values))
        }
        else {
            dispatch(putRoomEditManagement(values))
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
        dispatch(postImageRoomManagement(formData))
    }
    return (
        <>
            <div style={{ width: '60%', margin: '0px auto', fontWeight:'600' }}>
                <h1>THÊM PHÒNG</h1>
                {/* style={{ display: 'flex', justifyContent: 'center' }} */}
                <div >
                    <img style={{ margin: '0px auto' }} src={values.hinhAnh} alt="" width={350}
                        height={350} />
                    <div className='content_info_button'>
                        <button style={{ margin: '15px auto', backgroundColor: 'rgb(252 78 113)', marginTop: '20px', height: '40px', width: '120px', borderRadius: '0.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={handleEditAvatar}>Cập nhật ảnh</button></div>
                    {statusEditAvatar ? <> <form onSubmit={handleSubmitEditAvatar}>
                        <label htmlFor="avatarE">Chọn một ảnh từ máy tính của bạn: </label>
                        <input type="file"
                            multiple
                            onChange={handleAvatar}
                            id="avatarE" name="avatarE"
                            accept="image/png, image/jpeg"></input>
                    </form> </> : ""}
                </div>
                <br />
                <form onSubmit={handleSubmitAddLocation} >
                    <div style={{display:'flex'}}>
                        <div style={{ width: '60%', margin: '0px auto' }}>
                            <fieldset style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <label htmlFor="">Tên phòng: </label>
                                <input
                                    onChange={handleInputChange}
                                    value={values.tenPhong}
                                    type="text"
                                    name="tenPhong"
                                    id=""
                                    placeholder='Tên phòng' />
                            </fieldset>
                            <fieldset style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <label htmlFor="">Số khách: </label>
                                <input
                                    name="khach"
                                    onChange={handleInputChange}
                                    value={values.khach}
                                    type="text"
                                    id=""
                                    placeholder='Số khách' />
                            </fieldset>
                            <fieldset style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <label htmlFor="">Số phòng ngủ: </label>
                                <input
                                    name="phongNgu"
                                    onChange={handleInputChange}
                                    value={values.phongNgu}
                                    type="text"
                                    id=""
                                    placeholder='Số phòng ngủ' />
                            </fieldset>
                            <fieldset style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <label htmlFor="">Số giường ngủ: </label>
                                <input
                                    name="giuong"
                                    onChange={handleInputChange}
                                    value={values.giuong}
                                    type="text"
                                    id=""
                                    placeholder='Số giường ngủ' />
                            </fieldset>
                            <fieldset style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <label htmlFor="">Số phòng tắm: </label>
                                <input
                                    name="phongTam"
                                    onChange={handleInputChange}
                                    value={values.phongTam}
                                    type="text"
                                    id=""
                                    placeholder='Số phòng tắm' />
                            </fieldset>
                            <fieldset style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <label htmlFor="">Mô tả: </label>
                                <input
                                    name="moTa"
                                    onChange={handleInputChange}
                                    value={values.moTa}
                                    type="text"
                                    id=""
                                    placeholder='Mô tả' />
                            </fieldset>
                            <fieldset style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <label htmlFor="">Giá tiền: </label>
                                <input
                                    name="giaTien"
                                    onChange={handleInputChange}
                                    value={values.giaTien}
                                    type="text"
                                    id=""
                                    placeholder='Giá tiền' />
                            </fieldset>
                            <fieldset style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <label htmlFor="">Mã vị trí: </label>
                                <input
                                    name="maViTri"
                                    onChange={handleInputChange}
                                    value={values.maViTri}
                                    type="text"
                                    id=""
                                    placeholder='Mã vị trí' />
                            </fieldset>
                        </div>
                        {/* --- */}
                        <h3 style={{ fontSize: '24px', margin: '20px' }}>Tiện ích: </h3>
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '60%', margin: '0px auto' }}>
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div>Máy giặt: </div><div> <Switch checked={values.mayGiat} onChange={handleMayGiat} /></div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div>Bàn là: </div><div> <Switch checked={values.banLa} onChange={handleBanLa} /></div>
                                </div >
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div>Tivi: </div><div> <Switch checked={values.tivi} onChange={handleTivi} /></div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div>Điều hòa: </div><div> <Switch checked={values.dieuHoa} onChange={handleDieuhoa} /></div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div>Wifi: </div><div> <Switch checked={values.wifi} onChange={handleWifi} /></div>
                                </div>
                            </div>

                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div>Bếp: </div><div> <Switch checked={values.bep} onChange={handleBep} /></div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div>Bãi đổ xe: </div><div> <Switch checked={values.doXe} onChange={handleDoxe} /></div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div>Hồ bơi: </div><div> <Switch checked={values.hoBoi} onChange={handleHoboi} /></div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div>Bàn ủi: </div><div> <Switch checked={values.banUi} onChange={handleBanUi} /></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button style={{ height: '30px', width: '60px', backgroundColor: '#fc4e71', borderRadius: '0.25rem', fontWeight: '500' }} type='submit'>Lưu</button>
                </form>
            </div>
        </>
    )
}
