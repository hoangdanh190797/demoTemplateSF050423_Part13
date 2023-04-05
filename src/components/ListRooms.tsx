import React from 'react'
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { getRooms } from '../store/slices/RoomSlices';
import '../styles/components/_roomsComponent.scss';


export default function ListRooms() {
    const dispatch = useAppDispatch();
    const { isGetRooms, rooms } = useAppSelector((state: any) => {
        return state.rooms
    })

    useEffect(() => {
        dispatch(getRooms())
    }, [dispatch])

    let newListRooms: any = []
    if (isGetRooms) {
        newListRooms = rooms.slice(-8);
    }

    return (
        <div>
            <div>
                {newListRooms.map((item: any) => {
                    return (
                        <>
                            <div id='roomComponent_'>
                                <div className='roomComponent_box'>
                                    <img src={item.hinhAnh} alt="" />
                                    <span>{item.tenPhong}</span>
                                    <br />
                                    <span>${item.giaTien}</span>
                                </div>
                            </div>
                        </>
                    )
                })}
            </div>
        </div>
    )
}
