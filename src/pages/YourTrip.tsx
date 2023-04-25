import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { getBookingByIdUser } from '../store/slices/BookingSlices'
export default function YourTrip() {
    const dispatch = useAppDispatch();
    const { isGetBookingByIdUser, infoBookingByIdUser } = useAppSelector((state: any) => {
        return state.booking
    })
    const idUser = localStorage.getItem('idUser')
    useEffect(() => {
        dispatch(getBookingByIdUser(idUser))
    }, [dispatch])

    console.log(infoBookingByIdUser)

    return (
        <>
            <h1>Danh sách phòng đã đặt</h1>
            {infoBookingByIdUser.map((item: any) => {
                return (
                    <>
                        <div>
                            <div style={{ border: 'solid', height: '180px', width: '350px', borderRadius: '0.5rem', margin: '20px' }}>
                                <div style={{margin:'15px'}}>
                                    <h2 style={{ fontWeight: '500' }}>Mã đặt phòng: <span>{item.id}</span></h2>
                                    <h2 style={{ fontWeight: '500' }}>Mã phòng: <span>{item.maPhong}</span></h2>
                                    <h2 style={{ fontWeight: '500' }}>Mã người dùng: <span>{item.maNguoiDung}</span></h2>
                                    <h2 style={{ fontWeight: '500' }}>Ngày đến: <span>{item.ngayDen}</span></h2>
                                    <h2 style={{ fontWeight: '500' }}>Ngày đi: <span>{item.ngayDi}</span></h2>
                                    <h2 style={{ fontWeight: '500' }}>Số lượng khách <span>{item.soLuongKhach}</span></h2>

                                </div>
                            </div>

                        </div>

                    </>
                )
            })}
        </>
    )
}
