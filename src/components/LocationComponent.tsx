import React from "react";
import { useEffect, useState, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { Link } from 'react-router-dom';
import { getLocation } from '../store/slices/LocationSlices';

import '../styles/components/_locationComponent.scss';
import { Carousel } from 'antd';




export default function LocationComponent() {
    const dispatch = useAppDispatch();

    const { isGetRooms, rooms } = useAppSelector((state: any) => {
        return state.rooms
    })
    const { isGetLocation, location } = useAppSelector((state: any) => {
        return state.location
    })

    useEffect(() => {
        dispatch(getLocation())
            .unwrap()
            .then((payload) => console.log('fulfilled', payload))
            .catch((error) => console.error('rejected', error));
    }, [dispatch]);

    var settings = {
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      };

    return (
        <div id="" className="flex justify-center items-center h-[400px]">
            <div className="w-[60%]">
                <h1 className="text-[24px] font-[500]">Các điểm đến thu hút nhất Việt Nam</h1>
                <div><Carousel autoplay {...settings} slidesToShow={6}>
                    {location.map((item: any) => {
                        return (
                            <Link to={`/roomsByLocation/${item.id}`}>
                                <div>
                                    <div className='text-center' key={item.id}>
                                        <img className="h-[124px] w-[124px] mx-auto my-0 rounded-[100%] bg-center bg-no-repeat bg-cover" src={item.hinhAnh} alt="" />
                                        <h1 className="font-[500] text-[16px]">{item.tinhThanh}</h1>
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
                </Carousel>
                </div>
            </div>
        </div>
    )
}
