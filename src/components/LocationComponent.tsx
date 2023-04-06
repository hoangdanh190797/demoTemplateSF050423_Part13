import React from "react";
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { Link } from 'react-router-dom';
import { getLocation } from '../store/slices/LocationSlices';
import Slider from 'react-slick';
import '../styles/components/_locationComponent.scss';




export default function LocationComponent() {
    const dispatch = useAppDispatch();

    const { isGetRooms, rooms } = useAppSelector((state: any) => {
        return state.rooms
    })
    const { isGetLocation, location } = useAppSelector((state: any) => {
        return state.location
    })

    const newRoomsEx = [...rooms];
    const newArrMaViTri = [];

    useEffect(() => {
        dispatch(getLocation())
    }, [dispatch]);

    if (isGetLocation) {
        console.log(location);
    }

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 3
    };
    return (
            <div id="locationComponent_">
                <div className="locationComponent_container">
                    <h1>Các điểm đến thu hút nhất Việt Nam</h1>
                    <Link to={''}>
                        <div><Slider {...settings}>
                            {location.map((item: any) => {
                                return (
                                    <div>
                                        <div className='locationComponent_item'>
                                            <div 
                                            style={{ 
                                                height: '250px',
                                                width: '250px',
                                                margin:'0 auto',
                                                borderRadius: "100%", 
                                                backgroundImage: `url(${item.hinhAnh})`, 
                                                backgroundPosition: 'center', 
                                                backgroundRepeat: 'no-repeat', 
                                                backgroundSize: 'cover' }}>
                                            </div>
                                            <h1 style={{ color: '#fc4e71', fontSize: '24px', fontWeight: '600' }}>{item.tinhThanh}</h1>
                                        </div>
                                    </div>
                                )
                            })}
                        </Slider>
                        </div>
                    </Link>
                </div>
            </div>
    )
}
