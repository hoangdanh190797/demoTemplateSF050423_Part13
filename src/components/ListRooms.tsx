import React from 'react'
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { getRooms } from '../store/slices/RoomSlices';
import RoomsComponent from './RoomsComponent';
import '../styles/components/_listRooms.scss';


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
            <h1>Những chỗ nghỉ nổi bật khuyến nghị cho bạn:</h1>
            <div id='listRooms_'>
                <div className='listRooms_content'>
                    {newListRooms.map((item: any) => {
                        return (
                            <div className='listRooms_items'>
                                <RoomsComponent {...item} />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
