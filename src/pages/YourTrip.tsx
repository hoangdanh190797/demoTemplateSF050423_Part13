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
            {infoBookingByIdUser.map((item: any) => {
                return (
                    <>
                        <div>
                            <h1 style={{textAlign:'left'}}>{item.id}</h1>
                            <h1 style={{textAlign:'left'}}>{item.maNguoiDung}</h1>
                            <h1 style={{textAlign:'left'}}>{item.ngayDen}</h1>
                            <h1 style={{textAlign:'left'}}>{item.ngayDi}</h1>
                        </div>

                    </>
                )
            })}
        </>
    )
}
