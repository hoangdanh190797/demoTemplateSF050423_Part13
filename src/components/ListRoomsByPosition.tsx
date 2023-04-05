import React from 'react'
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { Link } from 'react-router-dom'
import '../styles/components/_selectPosition.scss'



export default function ListRoomsByPosition() {
    const dispatch = useAppDispatch();
    const { isGetRooms, rooms, isGetRoomsByPosition, roomsByPosition, arrGetPosition } = useAppSelector((state: any) => {
        return state.rooms
    })
    const newRoomsEx = [...rooms];
    const newArrMaViTri = [];
    // const arrSort = ['1'];
    if(isGetRooms){
        for(let item of newRoomsEx){
            if(rooms){
                let newViTri = item.maViTri;
                newArrMaViTri.push(newViTri)
            }
        }
        console.log(newArrMaViTri);
        const filteredArr = newArrMaViTri.filter((value, index, self) => {
            return self.indexOf(value) === index;
          });
        // if(newArrMaViTri)
        // {
        //     for(let num of newArrMaViTri){
        //         for(let numSort of arrSort)
        //         {
        //             if(num !== numSort)
        //             {
        //                 arrSort.push(num);
        //             }
        //         }
        //     }
        // }
        console.log(filteredArr);
    }
    return (
        <>
            <div style={{height:'500px'}}>
                <div>
                    {/* Vi tri */}
                    <div className='selectPosition'>
                        <Link to={''}>
                            <div><span>Hồ Chí Minh</span></div>
                        </Link>
                        <Link to={''}>
                            <div>Cần Thơ</div>
                        </Link>
                        <Link to={''}>
                            <div>Nha Trang</div>
                        </Link>
                        <Link to={''}>
                            <div>Hà Nội</div>
                        </Link>
                        <Link to={''}>
                            <div>Phú Quốc</div>
                        </Link>
                        <Link to={''}>
                            <div>Đà Nẵng</div>
                        </Link>
                        <Link to={''}>
                            <div>Đà Lạt</div>
                        </Link>
                        <Link to={''}>
                            <div>Mũi Né</div>
                        </Link>
                    </div>
                </div>
                <div>
                    {/* Lay phong theo vi tri */}
                    
                </div>
            </div>
        </>
    )
}
