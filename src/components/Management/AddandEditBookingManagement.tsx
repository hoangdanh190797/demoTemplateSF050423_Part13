import React from 'react'
import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { getRoomByIdForDetail, 
    putRoomEditManagement, 
    postRoomNewManagement, 
    postImageRoomManagement} from '../../store/slices/RoomSlices';

import { getByIDBookingManagement } from '../../store/slices/BookingSlices';

import { useParams, useNavigate, Link, NavLink } from "react-router-dom";
import { Switch } from 'antd';


export default function AddandEditBookingManagement() {
    const dispatch = useAppDispatch()
    let { idBooking } = useParams<any>();
    let newID: any = idBooking;
    let idBookingNum = parseInt(newID)

    localStorage.setItem('idRoomEdit', newID);

    useEffect(() => {
        if (idBooking) {
            dispatch(getByIDBookingManagement(idBookingNum));
        }
    }, [])

    //Chỉ cần nạp data vào lại roomDetail vẫn render thông tin cần!
    const { isGetRoomDetail, roomDetail, isPutRoomEditManagement, roomEditManagement } = useAppSelector((state: any) => {
        return state.rooms
    })
    const { isGetByIdBookingManagement, infoBooking} = useAppSelector((state: any) => {
        return state.booking
    })

    const initialValues = {
        id: '0',
        maPhong:'',
        ngayDen:'',
        ngayDi:'',
        soLuongKhach:'',
        maNguoiDung:'',
    };

    const [values, setValues] = useState<any>(initialValues)


    useEffect(() => {
        if (isGetByIdBookingManagement) {
            setValues(infoBooking)
        }
    }, [isGetByIdBookingManagement, infoBooking])

    const handleMayGiat = (checked: boolean) => {
        setValues({
            ...values,
            mayGiat: checked
        })
        console.log(checked);
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
        if (idBookingNum === 0) {
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
            <div>
                <h1>Quản lý đặt phòng</h1>
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
                <br />
                <form onSubmit={handleSubmitAddLocation}>
                    <fieldset>
                        <label htmlFor="">Mã đặt phòng: </label>
                        <input
                            onChange={handleInputChange}
                            disabled
                            value={values.maPhong}
                            type="text"
                            name="maPhong"
                            id=""
                            placeholder='Mã đặt phòng' />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="">Ngày đến: </label>
                        <input
                            onChange={handleInputChange}
                            value={values.ngayDen}
                            type="text"
                            name="ngayDen"
                            id=""
                            placeholder='Ngày đến' />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="">Ngày đi: </label>
                        <input
                            onChange={handleInputChange}
                            value={values.ngayDi}
                            type="text"
                            name="ngayDi"
                            id=""
                            placeholder='Ngày đi' />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="">Số lượng khách: </label>
                        <input
                            onChange={handleInputChange}
                            value={values.soLuongKhach}
                            type="text"
                            name="soLuongKhach"
                            id=""
                            placeholder='Số lượng khách' />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="">Mã người dùng: </label>
                        <input
                            onChange={handleInputChange}
                            disabled
                            value={values.maNguoiDung}
                            type="text"
                            name="maNguoiDung"
                            id=""
                            placeholder='Mã người dùng' />
                    </fieldset>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>Máy giặt: </div><div> <Switch checked={values.mayGiat} onChange={handleMayGiat} /></div>
                    </div>
                    <button type='submit'>Thêm</button>
                </form>
            </div>
        </>
    )
}
