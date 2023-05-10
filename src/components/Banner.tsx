import React, { useState } from 'react';
//
import HotelHome from '../assets/images/Hotel&Home.svg'
import HotelHomeBlack from '../assets/images/Hotel&HomeBlack.svg'
import SpaceAtOwn from '../assets/images/SpaceAtOwn.svg'
import PlaneHotel from '../assets/images/Plane&Hotel.svg'
import Plane from '../assets/images/Plane.svg'
import LongStay from '../assets/images/LongStay.svg'
import Activite from '../assets/images/Activite.svg'
//
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { getLocation } from '../store/slices/LocationSlices';


//---
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';

import { Link } from "react-router-dom";

//


export default function Banner() {

    const dispatch = useAppDispatch();

    const { location } = useAppSelector((state: any) => {
        return state.location
    })

    useEffect(() => {
        dispatch(getLocation())
    }, [dispatch]);

    const [valueOne, setValueOne] = React.useState<any | null>(null);
    const [statusID, setStatusID] = useState(false)

    return (
        <div>
            <div className='relative h-[555px]'>
                <div className='relative'>
                    <img className='w-full h-[320px]' src='https://cdn6.agoda.net/images/MVC/default/background_image/illustrations/bg-agoda-homepage.png' alt="" />
                    <div className='absolute top-1/4 left-1/2 translate-x-[-50%] translate-y-[-80%] text-white'>
                        <h1 className='text-[24px] leading-[10px] font-bold'>KHÁCH SẠN, KHU NGHỈ DƯỠNG, NHÀ TRỌ & HƠN THẾ NỮA</h1>
                        <h1 className='text-[20px] leading-[10px]'>Nhận giá tốt nhất cho {`>`} 2.000.000 chỗ nghỉ, trên toàn cầu</h1>
                    </div>
                </div>
                <div className='relative h-[389px]'>
                    <div className='bg-inherit flex items-center justify-center flex-col absolute z-10 top-2/5 left-1/2 translate-x-[-50%] translate-y-[-50%] bg-white rounded-[8px]'>
                        {/* --- */}
                        <div className='absolute z-10 bottom-0 translate-y-[-100%]'>
                            <ul className='rounded-[8px] bg-white flex justify-around round-[8px] h-[88px] w-[1064px] '>
                                <li className='m-auto '>
                                    <img className='h-[32px] w-[32px] mx-auto' src={HotelHome} alt="" />
                                    <div className='text-[16px] text-blue-500'>
                                        Khách sạn & Nhà
                                    </div>
                                </li>
                                <li className='m-auto '>
                                    <img className='h-[32px] w-[32px] sepia-[16%] invert-[32%] saturate-[240%] hue-rotate-[179deg] brightness-[88%] contrast-[94%)] mx-auto' src={SpaceAtOwn} alt="" />
                                    <div className='text-[16px]'>
                                        Chỗ ở riêng
                                    </div>
                                </li>
                                <li className='m-auto relative'>
                                    <div className='absolute w-32 top-0 left-0 translate-x-[-5%]  translate-y-[-110%] bg-red-600 text-white px-0.5 z-10'>
                                        Đặt Gói Tiết Kiệm
                                    </div>
                                    <img className='h-[32px] w-[32px] sepia-[16%] invert-[32%] saturate-[240%] hue-rotate-[179deg] brightness-[88%] contrast-[94%)] mx-auto' src={PlaneHotel} alt="" />
                                    <div className='text-[16px]'>
                                        Máy bay + K.sạn
                                    </div>
                                </li>
                                <li className='m-auto '>
                                    <img className='h-[32px] w-[32px] sepia-[16%] invert-[32%] saturate-[240%] hue-rotate-[179deg] brightness-[88%] contrast-[94%)] mx-auto' src={Plane} alt="" />
                                    <div className='text-[16px]'>
                                        Chuyến bay
                                    </div>
                                </li>
                                <li className='m-auto relative'>
                                    <div className='absolute w-8 top-0 left-1/2 translate-x-[-50%]  translate-y-[-110%] bg-red-600 text-white px-0.5 z-10'>
                                        Mới
                                    </div>
                                    <img className='h-[32px] w-[32px] sepia-[16%] invert-[32%] saturate-[240%] hue-rotate-[179deg] brightness-[88%] contrast-[94%)] mx-auto' src={LongStay} alt="" />
                                    <div className='text-[16px]'>
                                        Ở dài ngày
                                    </div>
                                </li>
                                <li className='m-auto relative'>
                                    <div className='absolute w-8 top-0 left-1/2 translate-x-[-50%]  translate-y-[-110%] bg-red-600 text-white px-0.5 z-10'>
                                        Mới
                                    </div>
                                    <img className='h-[32px] w-[32px] sepia-[16%] invert-[32%] saturate-[240%] hue-rotate-[179deg] brightness-[88%] contrast-[94%)] mx-auto' src={Activite} alt="" />
                                    <div className='text-[16px]'>
                                        Hoạt động
                                    </div>
                                </li>
                            </ul>
                        </div>
                        {/* --- */}
                        <div className='absolute top-0 translate-y-[-40%] rounded-[16px] bg-[#f8f7f9] h-[359px] w-[1124px] py-[84px] px-[32px]'>
                            <form>
                                <div>
                                    <div>
                                        <button className='my-[10px] rounded-[4px] h-[47px] w-[132px] bg-[#5392f9] hover:bg-[#87b3fb] text-white text-[14px] font-bold leading-5 mr-[5px]'>Chỗ Ở Qua Đêm</button>
                                        <button className='my-[10px] rounded-[4px] h-[47px] w-[132px] bg-white hover:bg-[#87b3fb] hover:text-[#ffffff] text-[#5392f9] border-blue-600 border text-[14px] font-medium leading-5 '>Chỗ Ở Trong Ngày</button>
                                    </div>
                                    <Stack className='my-[10px]'>
                                        <Autocomplete
                                            freeSolo
                                            id="free-solo-2-demo"
                                            disableClearable
                                            options={location.map((item: any) => item)}
                                            getOptionLabel={(item) => item.tinhThanh}
                                            onChange={(event: any, newValue: any | null) => {
                                                setValueOne(newValue);
                                                setStatusID(true);
                                            }}
                                            renderInput={(params) => (

                                                <TextField
                                                    {...params}
                                                    label="Nhập điểm du lịch hoặc tên khách sạn"
                                                    color="primary"
                                                    InputProps={{
                                                        ...params.InputProps,
                                                        type: 'search',
                                                    }}
                                                />

                                            )}
                                        />
                                    </Stack>
                                    <div className='flex flex-row items-center'>
                                        <div className='w-32 h-6 bg-red-600 text-white px-0.5 z-auto mr-3'>
                                            Đặt Gói Tiết Kiệm
                                        </div>
                                        <div className='mr-3'>
                                            <button className='w-[225px] h-[50px] border border-gray-500 bg-white rounded-[4px] inline-flex items-center justify-center'><span className='mr-1'>+ Bổ sung chuyến bay</span>
                                                <img className='' src={Plane} alt="" />
                                            </button>
                                        </div>
                                        <div>
                                            <button className='w-[225px] h-[50px] border border-gray-500 bg-white rounded-[4px] inline-flex items-center justify-center'><span className='mr-1'>+ Bổ sung khách sạn</span>
                                                <img className='' src={HotelHomeBlack} alt="" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <fieldset className=''>
                                </fieldset>

                            </form>

                        </div>
                        {/* --- */}
                        {statusID ? <Link to={`/roomsByLocation/${valueOne.id}`}>
                            <button className='absolute z-10 top-0 left-1/2 translate-x-[-60%] translate-y-[280%] h-[64px] w-[490px] bg-[#5392f9] rounded-[8px] text-white text-[20px] leading-5 hover:bg-[#7babfb]'>TÌM</button>
                        </Link> : <button className='absolute z-10 top-0 translate-y-[280%] h-[64px] w-[490px] bg-[#5392f9] rounded-[8px] text-white text-[20px] leading-5 hover:bg-[#7babfb]'>TÌM</button>}
                    </div>
                </div>

            </div>
        </div>
    )
}
