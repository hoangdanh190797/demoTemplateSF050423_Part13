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
            .unwrap()
            .then((payload) => console.log('fulfilled', payload))
            .catch((error) => console.error('rejected', error));
    }, [dispatch]);

    // if (isGetLocation) {
    //     console.log(location);
    // }

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
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
        <div id="locationComponent_">
            <div className="locationComponent_container">
                <h1>Các điểm đến thu hút nhất Việt Nam</h1>
                <div><Slider {...settings}>
                    {location.map((item: any) => {
                        return (
                            <Link to={`/roomsByLocation/${item.id}`}>
                                <div>
                                    <div className='locationComponent_item'>
                                        <div
                                            style={{
                                                height: '120px',
                                                width: '120px',
                                                margin: '0 auto',
                                                borderRadius: "100%",
                                                backgroundImage: `url(${item.hinhAnh})`,
                                                backgroundPosition: 'center',
                                                backgroundRepeat: 'no-repeat',
                                                backgroundSize: 'cover'
                                            }}>
                                        </div>
                                        <h1 style={{ color: '#fc4e71', fontSize: '24px', fontWeight: '600' }}>{item.tinhThanh}</h1>
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
                </Slider>
                </div>
            </div>
        </div>
    )
}
