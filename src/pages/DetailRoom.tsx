import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { useParams, useNavigate, Link, NavLink } from "react-router-dom";
//
import { getRoomByIdForDetail, postRoomBooking } from '../store/slices/RoomSlices'
//
import { getCommentsByIDRoom, postCommentsByIDRoom } from 'store/slices/CommentsSlices';
//
import { DatePicker, Space } from 'antd';
import type { DatePickerProps } from 'antd';
//
import  moment  from 'moment';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';

// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { TextFields } from '@mui/icons-material';


export default function DetailRoom() {
    const { RangePicker } = DatePicker;
    const dateFormat = 'DD/MM/YYYY';
    const customFormat: DatePickerProps['format'] = (value) =>
    `custom format: ${value.format(dateFormat)}`;

    const { idRoom } = useParams<any>();
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getRoomByIdForDetail(idRoom));
        dispatch(getCommentsByIDRoom(idRoom));
    }, [dispatch])

    // Room
    const { isGetRoomDetail, roomDetail } = useAppSelector((state: any) => {
        return state.rooms
    })
    const {
        tenPhong,
        khach,
        phongNgu,
        giuong,
        phongTam,
        moTa,
        giaTien,
        mayGiat,
        banLa,
        tivi,
        dieuHoa,
        wifi,
        bep,
        doXe,
        hoBoi,
        banUi,
        maViTri,
        hinhAnh } = roomDetail
    // Comments
    const { isGetComment, comments } = useAppSelector((state: any) => {
        return state.comments
    })

    const [contentComment, setContentComment] = useState('')

    const handleComment = (event: any) => {
        setContentComment(event.target.value)
    }

    const handleSubmitComment = (event: any) => {
        event.preventDefault();
        const idUser = localStorage.getItem('idUser')
        const date = new Date();
        let day = date.getDate();
        dispatch(
            postCommentsByIDRoom({
                'id': '0', 
                'maPhong': `${idRoom}`,
                'maNguoiBinhLuan': `${idUser}`,
                'ngayBinhLuan': `${day}`,
                'noiDung': `${contentComment}`,
                'saoBinhLuan': '0'
            }));
        dispatch(getCommentsByIDRoom(idRoom));
    }
    // Booking Room
    // const today = dayjs();
    // const tomorrow = dayjs().add(1, 'day');
    //
    // const [departureDate, setDepartureDate] = useState<Dayjs | null>(null);
    // const handleDepartureData = (dateNew: any | null) => {
    //     setDepartureDate(dateNew);
    // }
    // console.log(departureDate)

    const [dateFrom, setDateFrom] = useState<any | null>(null);
    const [dateTo, setDateTo] = useState<any | null>(null);

    const handleDepartureData = (date: any) => {
        if (date) {
          console.log('Date: ', date);
          localStorage.setItem('dateNeed', date);
        } else {
          console.log('Clear');
        }
      };

    const handleDateArray = (dates: null | (Dayjs | null)[], dateStrings: string[]) => {
        if (dates) {
          console.log('From: ', dates[0], ', to: ', dates[1]);
          console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);

          localStorage.setItem('dateFrom', dateStrings[0])
          localStorage.setItem('dateTo', dateStrings[1])
          
          setDateFrom(dates[0]);
          setDateTo(dates[1]);
        } else {
          console.log('Clear');
        }
      };



    // --- --- ---
    const [returnDate, setReturnDate] = useState();
    const handleReturnDate = (dateR: any) => {
        setReturnDate(dateR);
        let dateNN = returnDate;
        let formattedDateNN = moment(dateNN).format('DD-MM-YYYY');
        console.log(formattedDateNN)
    }
    
    const firstDay = localStorage.getItem('dateNeed')
    console.log(firstDay);
    
    const [count, setCount] = useState(1);

    const postInfoBooking = () => {}
        const idUser = localStorage.getItem('idUser')
        const GetdateFrom = localStorage.getItem('dateFrom')
        const GetdateTo = localStorage.getItem('dateTo')
        // console.log('GetdateFrom:', GetdateFrom);
        // console.log('GetdateTo:', GetdateTo);
        useEffect(() => {
            dispatch(postRoomBooking({
                "id":"0", 
                "maPhong":`${idRoom}`, 
                "ngayDen": dateFrom, 
                "ngayDi": dateTo, 
                "soLuongKhach": `${count}`, 
                "maNguoiDung":`${idUser}`}));
        }, [dispatch])
            
    return (
        <>
            {/*Thong tin chi tiet cua phong  */}
            <div>
                <h1>{tenPhong}</h1>
                <img src={hinhAnh} alt="" width={720} height={480} />
                <h1>Khách: {khach} - Phòng ngủ: {phongNgu} - Giường: {giuong} - Phòng tắm: {phongTam}</h1>
                <p>Mô tả: {moTa}</p>
                <h1>Tiện nghi:</h1>
                <div>{mayGiat ? <h3>Máy giặt</h3> : ''}</div>
                <div>{banLa ? <h3>Bàn là</h3> : ''}</div>
                <div>{tivi ? <h3>Tivi</h3> : ''}</div>
                <div>{dieuHoa ? <h3>Điều hòa</h3> : ''}</div>
                <div>{wifi ? <h3>Wifi</h3> : ''}</div>
                <div>{bep ? <h3>Bếp</h3> : ''}</div>
                <div>{doXe ? <h3>Đổ xe</h3> : ''}</div>
                <div>{hoBoi ? <h3>Hồ bơi</h3> : ''}</div>
                <div>{banUi ? <h3>Bàn ủi</h3> : ''}</div>
            </div>
            {/* Binh luan */}
            <div>
                {comments.map((comment: any) => {
                    return (
                        <>
                            <div style={{ display: 'flex' }}>
                                <div>{comment.ngayBinhLuan}</div>
                                <div>{comment.noiDung}</div>
                                <div>{comment.saoBinhLuan}</div>
                                <div>{comment.tenNguoiBinhLuan}</div>
                                <img src={comment.avatar} alt="" width={50} height={50} />
                            </div>
                        </>
                    )
                })}
            </div>
            {/* CRUD Comment  */}
            {/* Chi duoc POST comment, khong co quyen Chinh sua, khong co quyen Xoa */}
            <div>
                <form onSubmit={handleSubmitComment}>
                    <fieldset>
                        <input type="textarea" placeholder='Hãy mô tả cảm xúc của bạn!' onChange={handleComment} />
                        <button type='submit'>Add Comment</button>
                    </fieldset>
                </form>
            </div>
            {/* Dat phong */}
            <div>
                <RangePicker 
                defaultValue={[dayjs('11/04/2023', dateFormat), dayjs('11/04/2023', dateFormat)]}
                format={dateFormat}
                onChange={handleDateArray}
                />
            </div>
            <div>
                <div>
                    <div>
                        <button onClick={() => setCount(count - 1)}>-</button>
                    </div>
                    <div><span>{count}</span></div>
                    <div>
                        <button onClick={() => setCount(count + 1)}>+</button>
                    </div>
                </div>
            </div>
            <button onClick={() => postInfoBooking()}>Đặt phòng</button>
        </>
    )
}
