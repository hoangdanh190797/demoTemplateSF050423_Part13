import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { useParams, useNavigate, Link, NavLink } from "react-router-dom";
//
import { getRoomByIdForDetail, postRoomBooking, checkPostInfoBookingFulfiled } from '../store/slices/RoomSlices'
//
import { getCommentsByIDRoom, postCommentsByIDRoom } from 'store/slices/CommentsSlices';
//
import { DatePicker, Space } from 'antd';
import type { DatePickerProps } from 'antd';
//
import moment from 'moment'; // Chỉ dùng dayjs
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';

import bepSVG from '../assets/images/bepSVG.svg'
import mayGiatSVG from '../assets/images/mayGiatSVG.svg'
import maySaySVG from '../assets/images/maySaySVG.svg'
import tiviSVG from '../assets/images/tiviSVG.svg'
import wifiSVG from '../assets/images/wifiSVG.svg'
import gymSVG from '../assets/images/gymSVG.svg'
import hoBoiSVG from '../assets/images/hoBoiSVG.svg'
import thangMaySVG from '../assets/images/thangMaySVG.svg'
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import {checkPostInfoBooking} from '../store/slices/RoomSlices'
import '../styles/pages/_detailRoom.scss'



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
    const { isGetRoomDetail, roomDetail, isPostBookingRejected, isPostInfoBooking } = useAppSelector((state: any) => {
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

    const [items, setItems] = useState([]);
    const [currentItemCount, setCurrentItemCount] = useState(5);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const loadedItems = comments.slice(0, currentItemCount);
        setItems(loadedItems);
        setLoading(false);
    }, [comments, currentItemCount])

    const handleLoadMore = () => {
        setCurrentItemCount(currentItemCount + 5);
        setLoading(true);
    };

    //--- --- ---
    const [contentComment, setContentComment] = useState('')
    const handleComment = (event: any) => {
        setContentComment(event.target.value)
    }
    const { isStatusSignin } = useAppSelector((state: any) => {
        return state.auth
    })


    const handleSubmitComment = (event: any) => {
        event.preventDefault();
        if (isStatusSignin) {
            const idUser = localStorage.getItem('idUser')
            const date = dayjs();
            let day = date.format();
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
        else {
            console.log('Vui lòng đăng nhập')
        }

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


    // const handleDepartureData = (date: any) => {
    //     if (date) {
    //         console.log('Date: ', date);
    //         localStorage.setItem('dateNeed', date);
    //     } else {
    //         console.log('Clear');
    //     }
    // };

    const [dateFrom, setDateFrom] = useState<Dayjs | null>(null);
    const [dateTo, setDateTo] = useState<Dayjs | null>(null);
    const [countDay, setCountDay] = useState<any>()

    const handleDateArray = (dates: null | (Dayjs | null)[], dateStrings: string[]) => {
        if (dates) {
            console.log('From: ', dates[0], ', to: ', dates[1]);
            console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);

            localStorage.setItem('dateFrom', dateStrings[0])
            localStorage.setItem('dateTo', dateStrings[1])

            setDateFrom(dates[0]);
            setDateTo(dates[1]);

            let daysDiff = dates[0]?.startOf('day').diff(dates[1]?.startOf('day'), 'day');
            setCountDay(daysDiff)

        } else {
            console.log('Clear');
        }
    };
    

    // --- --- ---
    const [returnDate, setReturnDate] = useState();
    // const handleReturnDate = (dateR: any) => {
    //     setReturnDate(dateR);
    //     let dateNN = returnDate;
    //     let formattedDateNN = moment(dateNN).format('DD-MM-YYYY');
    //     console.log(formattedDateNN)
    // }

    const firstDay = localStorage.getItem('dateNeed')
    console.log(firstDay);
    const [count, setCount] = useState(1);

    const postInfoBooking = () => {
        if (isStatusSignin) {
            const idUser = localStorage.getItem('idUser')
            dispatch(postRoomBooking({
                "id": "0",
                "maPhong": `${idRoom}`,
                "ngayDen": dateFrom,
                "ngayDi": dateTo,
                "soLuongKhach": `${count}`,
                "maNguoiDung": `${idUser}`
            }));
        }
        else {
            console.log('Vui lòng đăng nhập')
        }
        if(isPostBookingRejected)
        {   
            setTimeout(() => {
                dispatch(checkPostInfoBooking())
            }, 3000)
        }
    };

    if(isPostBookingRejected)
    {   
        setTimeout(() => {
            dispatch(checkPostInfoBooking())
        }, 3000)
    }
    if(isPostInfoBooking){
        setTimeout(() => {
            dispatch(checkPostInfoBookingFulfiled())
        }, 3000)
    }


    return (
        <div id='detailRoom_'>
            {/*Thong tin chi tiet cua phong  */}

            <div>
            {isPostBookingRejected ? <Stack sx={{ width: '32%' }} spacing={2} style={{ position: 'absolute', right: '0px' }}>
              <Alert severity="error">Vui lòng điền đầy đủ thông tin đặt phòng</Alert>
            </Stack> : ''}
            {isPostInfoBooking ? <Stack sx={{ width: '32%' }} spacing={2} style={{ position: 'absolute', right: '0px' }}>
              <Alert severity="success">Đặt phòng thành công!</Alert>
            </Stack> : ''}
            
                <h1 className='detailRoom_title'>{tenPhong}</h1>
                <img className='detailRoom_img' src={hinhAnh} alt="" width={720} height={480} />
            </div>
            <div className='detailRoom_content'>
                <div className='detailRoom_info'>
                    <div>
                        <h1 className='detailRoom_infoBase'>Khách: {khach} - Phòng ngủ: {phongNgu} - Giường: {giuong} - Phòng tắm: {phongTam}</h1>
                        <p className='detailRoom_contentInfo'>Mô tả: {moTa}</p>
                        <h1>Tiện nghi:</h1>
                        <div className='detailRoom_convenient'>
                            <div className='convenient_left'>
                                <div >
                                    {mayGiat ?
                                        <div className='convient_icon'>
                                            <div><img src={mayGiatSVG} alt="" /></div>
                                            <div><h3>Máy giặt</h3> </div>
                                        </div>
                                        : ''}
                                </div>

                                <div >
                                    {banLa ?
                                        <div className='convient_icon'>
                                            <div><img src={maySaySVG} alt="" /></div>
                                            <div><h3>Bàn là</h3> </div>
                                        </div>
                                        : ''}
                                </div>

                                <div >
                                    {tivi ?
                                        <div className='convient_icon'>
                                            <div><img src={tiviSVG} alt="" /></div>
                                            <div><h3>Tivi</h3> </div>
                                        </div>
                                        : ''}
                                </div>

                                <div >
                                    {dieuHoa ?
                                        <div className='convient_icon'>
                                            <div><img src={gymSVG} alt="" /></div>
                                            <div><h3>Điều hòa</h3> </div>
                                        </div>
                                        : ''}
                                </div>

                                <div >
                                    {wifi ?
                                        <div className='convient_icon'>
                                            <div><img src={wifiSVG} alt="" /></div>
                                            <div><h3>Wifi</h3> </div>
                                        </div>
                                        : ''}
                                </div>

                            </div>
                            <div className='convenient_right'>
                                <div >
                                    {bep ?
                                        <div className='convient_icon'>
                                            <div><img src={bepSVG} alt="" /></div>
                                            <div><h3>Bếp</h3> </div>
                                        </div>
                                        : ''}
                                </div>

                                <div >
                                    {doXe ?
                                        <div className='convient_icon'>
                                            <div><img src={hoBoiSVG} alt="" /></div>
                                            <div><h3>Đổ xe</h3> </div>
                                        </div>
                                        : ''}
                                </div>

                                <div >
                                    {hoBoi ?
                                        <div className='convient_icon'>
                                            <div><img src={thangMaySVG} alt="" /></div>
                                            <div><h3>Hồ bơi</h3> </div>
                                        </div>
                                        : ''}
                                </div>

                                <div >
                                    {banUi ?
                                        <div className='convient_icon'>
                                            <div><img src={thangMaySVG} alt="" /></div>
                                            <div><h3>Bàn ủi</h3> </div>
                                        </div>
                                        : ''}
                                </div>

                            </div>
                        </div>
                    </div>
                    {/* Binh luan */}
                    <div>
                        <>
                            <h3 style={{ padding: '10px 0px 0px 20px', fontWeight: '500', fontSize: '24px' }}>Bình luận</h3>
                            {!isStatusSignin ? <Stack sx={{ width: '32%' }} spacing={2} style={{ position: 'absolute', right: '0px' }}>
                                <Alert severity="error">Vui lòng đăng nhập trước khi bình luận</Alert>
                            </Stack> : ''}
                            <div style={{ margin: '20px', height: '30px' }}>
                                <form onSubmit={handleSubmitComment}>
                                    <fieldset>
                                        <input style={{ width: '50%', height: '28px' }} type="textarea" placeholder='Hãy mô tả cảm xúc của bạn!' onChange={handleComment} />
                                        <button style={{ height: '28px', width: '20%', fontWeight: '500' }} type='submit'>Add Comment</button>
                                    </fieldset>
                                </form>
                            </div>
                            <>
                                {items.map((item: any) => {
                                    return (
                                        <div style={{ display: 'flex', padding: '10px 10px 10px 20px' }}>
                                            <div>
                                                <img src={item.avatar} alt="" width={50} height={50} />
                                            </div>

                                            <div style={{ paddingLeft: '15px' }}>{item.noiDung}
                                                <div>
                                                    <div>{item.ngayBinhLuan}</div>
                                                    <div>{item.tenNguoiBinhLuan}</div>
                                                </div>
                                            </div>
                                            <div style={{ textAlign: 'right' }}>{item.saoBinhLuan}</div>
                                        </div>
                                    )
                                })}
                                {loading && <p>Loading...</p>}
                                {currentItemCount < comments.length && (
                                    <button style={{
                                        padding: '0px 0px 20px 20px',
                                        fontWeight: '500'
                                    }} onClick={handleLoadMore}>Xem thêm</button>
                                )}
                            </>
                        </>
                        {/* {comments.map((comment: any) => {
                            return (
                                <>

                                </>
                            )
                        })} */}
                    </div>
                    {/* CRUD Comment  */}
                    {/* Chi duoc POST comment, khong co quyen Chinh sua, khong co quyen Xoa */}

                </div>
                <div className='detailRoom_booking'>
                    {/* Dat phong */}
                    <div className='detailRoom_infoBooking'>
                        <h1 className='detailRoom_price'>${giaTien}/Đêm</h1>
                        <div className=''>
                            <RangePicker
                                className='detailRoom_datePicker'
                                format={dateFormat}
                                onChange={handleDateArray}
                            />
                        </div>
                        <div className='detailRoom_day'>
                            <div className='detailRoom_countDay'>
                                <div>
                                    <button onClick={() => setCount(count - 1)}>-</button>
                                </div>
                                <div><span>{count} người</span></div>
                                <div>
                                    <button onClick={() => setCount(count + 1)}>+</button>
                                </div>
                            </div>
                        </div>
                        <button className='detailRoom_btnBooking' onClick={postInfoBooking}>Đặt phòng</button>
                        <div style={{marginTop:'20px'}}>
                            <p>Số ngày đi (tạm tính): <span style={{fontWeight:'700'}}>{countDay*(-1)} ngày</span></p>
                            <p>Số người đi (tạm tính): <span style={{fontWeight:'700'}}>{count} người</span></p>
                            <p>Số tiền 1 đêm (tạm tính): <span style={{fontWeight:'700'}}>${giaTien}</span></p>
                            <p>Tổng số tiền trước thuế (tạm tính): <span style={{fontWeight:'700'}}>${giaTien*count*countDay*(-1)}</span></p>
                        </div>
                        {!isStatusSignin ? <Stack sx={{ width: '32%' }} spacing={2} style={{ position: 'absolute', right: '0px' }}>
                                <Alert severity="error">Vui lòng đăng nhập trước khi đặt phòng</Alert>
                            </Stack> : ''}
                    </div>
                </div>
            </div>
        </div>
    )
}
