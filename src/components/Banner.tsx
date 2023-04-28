import React, { useState } from 'react';
import bannerJPG from '../assets/images/bannerJPG.jpg'
// import '../styles/components/_banner.scss';
//
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { getLocation } from '../store/slices/LocationSlices';
//
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

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

    const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-17'));
    const [valueOne, setValueOne] = React.useState<any | null>(null);
    const [statusID, setStatusID] = useState(false)

    return (
        <div>
            <div>
                <div className='relative'>
                    <img className='w-full h-[320px]' src={bannerJPG} alt="" />
                    <div className='absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] text-white'>
                        <h1 className='text-[24px]'>KHÁCH SẠN, KHU NGHỈ DƯỠNG, NHÀ TRỌ & HƠN THẾ NỮA</h1>
                        <h1 className='text-[20px]'>Nhận giá tốt nhất cho {`>`} 2.000.000 chỗ nghỉ, trên toàn cầu</h1>
                    </div>
                </div>
                <div>
                    <div>
                        <div>Khách sạn & Nhà</div>
                        <div>Chỗ ở riêng</div>
                        <div>Máy bay + K.sạn</div>
                        <div>Chuyến bay</div>
                        <div>Ở dài ngày</div>
                        <div>Hoạt động</div>
                    </div>
                </div>

                <div>
                    <form>
                        {/* --- */}
                        <div>
                            <Stack>
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
                        </div>
                        {/* --- */}
                        <div>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    className='w-2/5'
                                    label="Controlled picker"
                                    value={value}
                                    onChange={(newValue) => setValue(newValue)}
                                />
                                <DatePicker
                                    className='w-2/5'
                                    label="Controlled picker"
                                    value={value}
                                    onChange={(newValue) => setValue(newValue)}
                                />
                            </LocalizationProvider>
                        </div>
                        {/* --- */}
                        <Stack>
                            <Autocomplete
                                freeSolo
                                id="free-solo-2-demo"
                                disableClearable
                                options={location.map((item: any) => item)}
                                getOptionLabel={(item) => item.tinhThanh}
                                // value={value}
                                onChange={(event: any, newValue: any | null) => {
                                    setValueOne(newValue);
                                    setStatusID(true);
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Số lượng khách"
                                        color="primary"
                                        InputProps={{
                                            ...params.InputProps,
                                            type: 'search',
                                        }}
                                    />
                                )}
                            />
                        </Stack>

                        <fieldset className=''>
                        </fieldset>
                        {/* --- */}
                        {statusID ? <Link to={`/roomsByLocation/${valueOne.id}`}>
                            <button className='button_Search '></button>
                        </Link> : <button><span>TÌM</span></button>}
                    </form>
                </div>
            </div>
        </div>
    )
}
