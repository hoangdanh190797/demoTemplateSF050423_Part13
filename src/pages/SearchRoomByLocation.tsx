import React from 'react'
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { getRoomsByLocation } from '../store/slices/RoomSlices';
import { useParams, useNavigate, Link, NavLink } from "react-router-dom";
import RoomsComponent from 'components/RoomsComponent';


export default function SearchRoomByLocation() {
    const { idLocation } = useParams<any>();

    const dispatch = useAppDispatch();

    const { isGetRoomsByLocation, roomsByLocation } = useAppSelector((state: any) => {
        return state.rooms
    })

    const newRoomsEx = [...roomsByLocation];
    const newArrMaViTri = [];

    useEffect(() => {
        dispatch(getRoomsByLocation(idLocation))
    }, [dispatch]);

    if (isGetRoomsByLocation) {
        console.log(roomsByLocation);
    }
  return (
    <div>
    <h1>Những chỗ nghỉ nổi bật khuyến nghị cho bạn:</h1>
    <div id='listRooms_'>
        <div className='listRooms_content'>
            {roomsByLocation.map((item: any) => {
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
