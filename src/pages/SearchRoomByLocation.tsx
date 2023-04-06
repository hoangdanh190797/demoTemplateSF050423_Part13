import React from 'react'
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { getRoomsByLocation } from '../store/slices/RoomSlices';


export default function SearchRoomByLocation() {
    const dispatch = useAppDispatch();

    const { isGetRoomsByLocation, roomsByLocation } = useAppSelector((state: any) => {
        return state.rooms
    })

    const newRoomsEx = [...roomsByLocation];
    const newArrMaViTri = [];

    useEffect(() => {
        dispatch(getRoomsByLocation())
    }, [dispatch]);

    if (isGetRoomsByLocation) {
        console.log(roomsByLocation);
    }
  return (
    <div>SearchRoomByLocation</div>
  )
}
