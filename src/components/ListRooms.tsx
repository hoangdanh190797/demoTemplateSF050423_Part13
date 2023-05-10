import React from 'react'
import { useState, useEffect } from 'react';
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
        newListRooms = rooms.slice(0, 8);
    }
    return (
        <div className='ml-auto mr-auto w-[1124px] h-[100hv] '>
            <h1 className='text-[24px] font-[500]'>Những chỗ nghỉ nổi bật khuyến nghị cho bạn:</h1>
            <div className='flex justify-center h-[100hv]'>
                <div className='flex flex-row flex-wrap'>
                    {newListRooms.map((item: any) => {
                        return (
                                <div className='basis-1/4'>
                                    <RoomsComponent {...item} />
                                </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
