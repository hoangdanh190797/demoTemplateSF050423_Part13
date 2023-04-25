import React from 'react'
import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import {
    getRoomByIdForDetail,
    putRoomEditManagement,
    postRoomNewManagement,
    postImageRoomManagement
} from '../../store/slices/RoomSlices';

import { getByIDBookingManagement, putEditBookingManagement } from '../../store/slices/BookingSlices';

import { useParams, useNavigate, Link, NavLink } from "react-router-dom";
import { Switch } from 'antd';

import { DatePicker, Space } from 'antd';
import type { DatePickerProps } from 'antd';

import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';


export default function AddandEditBookingManagement() {

    const { RangePicker } = DatePicker;
    const dateFormat = 'DD-MM-YYYY';
    const customFormat: DatePickerProps['format'] = (value) =>
        `custom format: ${value.format(dateFormat)}`;
    const dispatch = useAppDispatch()
    let { idBooking } = useParams<any>();
    let newID: any = idBooking;
    let idBookingNum = parseInt(newID)
    localStorage.setItem('idRoomEdit', newID);

    useEffect(() => {
        if (idBooking) {
            dispatch(getByIDBookingManagement(idBookingNum));
        }
    }, [dispatch])

    //Chỉ cần nạp data vào lại roomDetail vẫn render thông tin cần!
    const { isGetByIdBookingManagement, infoBooking } = useAppSelector((state: any) => {
        return state.booking
    })

    const initialValues = {
        id: '0',
        maPhong: '',
        ngayDen: '',
        ngayDi: '',
        soLuongKhach: '',
        maNguoiDung: '',
    };

    const [values, setValues] = useState<any>(initialValues)

    useEffect(() => {
        if (isGetByIdBookingManagement) {
            setValues(infoBooking)
        }
        // let newNgayDen = dayjs(new Date(values.ngayDen), dateFormat)
        // setValues({...values, ngayDen: newNgayDen})

        // let newNgayDi = dayjs(new Date(values.ngayDi), dateFormat)
        // setValues({...values, ngayDi: newNgayDi})
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
            dispatch(putEditBookingManagement(values))
        }
    }

    const [statusEditAvatar, setStatusEditAvatar] = useState(false)
    const handleEditAvatar = () => {setStatusEditAvatar(true)}
    const handleSubmitEditAvatar = () => { }
    const handleAvatar = (event: any) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('formFile', file, file.name);
        // setAvatar(formData.get('formFile') as File);
        dispatch(postImageRoomManagement(formData))
    }

    // const [dateFrom, setDateFrom] = useState<Dayjs | null>(null);
    // const [dateTo, setDateTo] = useState<Dayjs | null>(null);

    // const handleDateArray = (dates: null | (Dayjs | null)[], dateStrings: string[]) => {
    //     if (dates) {
    //         console.log('From: ', dates[0], ', to: ', dates[1]);
    //         console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);

    //         localStorage.setItem('dateFrom', dateStrings[0])
    //         localStorage.setItem('dateTo', dateStrings[1])

    //         setDateFrom(dates[0]);
    //         setDateTo(dates[1]);

    //     } else {
    //         console.log('Clear');
    //     }
    // };


    // console.log(NgayDenFormat)

    return (
        <>
            <div>
                <h1>Quản lý đặt phòng (Chỉnh sửa)</h1>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                </div>
                <br />
                <form onSubmit={handleSubmitAddLocation}>
                    <fieldset style={{display:'flex', justifyContent:'space-between', width:'40%', margin:'10px auto'}}>
                        <label style={{fontWeight:'600'}} htmlFor="">Mã đặt phòng: </label>
                        <input
                            onChange={handleInputChange}
                            disabled
                            value={values.id}
                            type="text"
                            name="maPhong"
                            id=""
                            placeholder='Mã đặt phòng' />
                    </fieldset>
                    <fieldset style={{display:'flex', justifyContent:'space-between', width:'40%', margin:'10px auto'}}>
                        <label style={{fontWeight:'600'}} htmlFor="">Mã phòng: </label>
                        <input
                            onChange={handleInputChange}
                            disabled
                            value={values.maPhong}
                            type="text"
                            name="maPhong"
                            id=""
                            placeholder='Mã đặt phòng' />
                    </fieldset>
                    <fieldset style={{display:'flex', justifyContent:'space-between', width:'40%', margin:'10px auto'}}>
                        <label style={{fontWeight:'600'}} htmlFor="">Ngày đến: </label>
                        <input
                            onChange={handleInputChange}
                            value={values.ngayDen}
                            type="text"
                            name="ngayDen"
                            id=""
                            placeholder='Ngày đến' />
                    </fieldset>
                    <fieldset style={{display:'flex', justifyContent:'space-between', width:'40%', margin:'10px auto'}}>
                        <label style={{fontWeight:'600'}} htmlFor="">Ngày đi: </label>
                        <input
                            onChange={handleInputChange}
                            value={values.ngayDi}
                            type="text"
                            name="ngayDi"
                            id=""
                            placeholder='Ngày đi' />
                    </fieldset>
                    <fieldset style={{display:'flex', justifyContent:'space-between', width:'40%', margin:'10px auto'}}>
                        <label style={{fontWeight:'600'}} htmlFor="">Số lượng khách: </label>
                        <input
                            onChange={handleInputChange}
                            value={values.soLuongKhach}
                            type="text"
                            name="soLuongKhach"
                            id=""
                            placeholder='Số lượng khách' />
                    </fieldset>
                    <fieldset style={{display:'flex', justifyContent:'space-between', width:'40%', margin:'10px auto'}}>
                        <label style={{fontWeight:'600'}} htmlFor="">Mã người dùng: </label>
                        <input
                            onChange={handleInputChange}
                            disabled
                            value={values.maNguoiDung}
                            type="text"
                            name="maNguoiDung"
                            id=""
                            placeholder='Mã người dùng' />
                    </fieldset>
                    <button style={{ height:'30px', width:'80px', backgroundColor:'#fc4e71', borderRadius:'0.25rem', fontWeight:'500', marginLeft:'30%'}} type='submit'>Lưu</button>
                </form>
            </div>
        </>
    )
}
