import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { useParams, useNavigate, Link, NavLink } from "react-router-dom";
//
import { getRoomByIdForDetail, postRoomBooking } from '../store/slices/RoomSlices'
//
import { getCommentsByIDRoom, postCommentsByIDRoom } from 'store/slices/CommentsSlices';
//
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


export default function DetailRoom() {
    const { id } = useParams<any>();
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getRoomByIdForDetail(id));
        dispatch(getCommentsByIDRoom(id));
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
                'id': '0', 'maPhong': `${id}`,
                'maNguoiBinhLuan': `${idUser}`,
                'ngayBinhLuan': `${day}`,
                'noiDung': `${contentComment}`,
                'saoBinhLuan': '0'
            }));
        dispatch(getCommentsByIDRoom(id));
    }
    // Booking Room
    const [departureDate, setDepartureDate] = useState();
    const [returnDate, setReturnDate] = useState();
    const today = dayjs();
    const tomorrow = dayjs().add(1, 'day');
    console.log(departureDate);

    const [count, setCount] = useState(0);

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
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker', 'DatePicker']}>
                        <DatePicker
                            label="Controlled picker"
                            defaultValue={today}
                            minDate={tomorrow}
                            value={departureDate}
                            views={['year', 'month', 'day']}
                            onChange={(newValue: any) => setDepartureDate(newValue)}
                        />
                    </DemoContainer>
                    <DemoContainer components={['DatePicker', 'DatePicker']}>
                        <DatePicker
                            label="Controlled picker"
                            defaultValue={today}
                            minDate={tomorrow}
                            value={returnDate}
                            views={['year', 'month', 'day']}
                            onChange={(newValue: any) => setReturnDate(newValue)}
                        />
                    </DemoContainer>
                </LocalizationProvider>
            </div>
            <div>
                <div>
                    <div>
                        <button onClick={()=> setCount(count - 1)}>-</button>
                    </div>
                    <div><span>{count}</span></div>
                    <div>
                        <button onClick={()=> setCount(count + 1)}>+</button>
                    </div>
                </div>
            </div>
        </>
    )
}
