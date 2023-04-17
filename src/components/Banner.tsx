import React, { useState } from 'react'
import '../styles/components/_banner.scss';
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
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useParams, useNavigate, Link, NavLink } from "react-router-dom";

//


export default function Banner() {

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

    // if (isGetLocation) {
    //     console.log(location);
    // }
    const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-17'));
    const [valueOne, setValueOne] = React.useState<any | null>(null);
    const [statusID, setStatusID] = useState(false)

    console.log(valueOne);

    // console.log(valueOne);
    // if(statusID){ 
    //     let { id } = valueOne;
    //     return id
    // }

    const handleSearch = () => {

    }

    return (
        <div id='banner_'>
            <div className='banner_background'
            >   <div style={{
                width: '100%',
                height: '480px',
                backgroundImage: "url('https://transcode-v2.app.engoo.com/image/fetch/f_auto,c_limit,w_1280,h_800,dpr_2/https://assets.app.engoo.com/images/5Z2eP5Tfe0anTWCtliOV2v.jpeg')",
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',

            }}></div>
                <div className='banner_title_main'>
                    <div className='banner_title hover:bg-sky-700 border-around'>
                        <div>Khách sạn & Nhà</div>
                        <div>Chỗ ở riêng</div>
                        <div>Máy bay + K.sạn</div>
                        <div>Chuyến bay</div>
                        <div>Ở dài ngày</div>
                        <div>Hoạt động</div>
                    </div>
                </div>

                <div className='banner_search'>
                    <form className='banner_form' onSubmit={handleSearch}>
                        {/* --- */}
                        <div>
                            <Stack className='searchInput_content'>
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
                                    // inputValue={inputValue}
                                    // onInputChange={(event, newInputValue) => {
                                    //     setInputValue(newInputValue);
                                    //   }}
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
                        <div className='datePicker'>
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
                        {/* <input className='input_two' type="text" placeholder='Nhập số lượng khách' /> */}
                        <Stack className='searchInput_content_two'>
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
                                // inputValue={inputValue}
                                // onInputChange={(event, newInputValue) => {
                                //     setInputValue(newInputValue);
                                //   }}
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
                        </Link> : <button className='button_Search'><span>TÌM</span></button>}
                    </form>
                </div>
            </div>
        </div>
    )
}
