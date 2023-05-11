import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { getBookingByIdUser } from '../store/slices/BookingSlices'
import { Tabs, Button } from 'antd';
import type { TabsProps } from 'antd';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';


import { getRoomByIdForDetail } from '../store/slices/RoomSlices'
import { CheckCircleTwoTone } from '@ant-design/icons';
import { useNavigate, Link } from "react-router-dom";

import dayjs from 'dayjs';

export default function YourTrip() {
    const dispatch = useAppDispatch();
    const { isGetBookingByIdUser, infoBookingByIdUser } = useAppSelector((state: any) => {
        return state.booking
    })
    const idUser = localStorage.getItem('idUser')
    useEffect(() => {
        dispatch(getBookingByIdUser(idUser))
    }, [dispatch])

    console.log(infoBookingByIdUser)

    const items: TabsProps['items'] = [
        {
            key: '1',
            label:
                <div className='flex flex-row items-center hover:text-white hover:bg-[#669efa] px-10 h-[40px]'>
                    <AssignmentTurnedInIcon className='mr-2'></AssignmentTurnedInIcon>
                    <span className='text-[15px] font-[700] leading-2'>Đơn đặt chỗ của tôi</span>
                </div>,
            children:
                <div className='bg-[#f8f7f9]'>
                    <div className='mx-12 mb-12'>
                        {infoBookingByIdUser.map((item: any) => {
                            const { ngayDen, ngayDi } = item;
                            let newNgayDen = dayjs(new Date(ngayDen));
                            let newNgayDi = dayjs(new Date(ngayDi));
                            return (
                                <div className='p-8'>
                                    <div className='w-[800px] border-[2px] bg-white'>
                                        <div className='flex flex-row justify-between  '>
                                            <div>
                                                <img className='h-[220px] w-full' src="https://pix8.agoda.net/hotelImages/21726077/0/c8d183272cd3905698696028de14e03b.jpg?ca=16&ce=1&s=346x346" alt="" />
                                            </div>
                                            <div className='p-3'>
                                                <ul>
                                                    <li><span className='font-[200]'>Mã số đặt phòng:</span> <span className='text-[#2a2a2e] text-[14px] font-[700] leading-3'>{item.id}</span></li>
                                                    <li><span className='font-[200]'>Mã số phòng:</span> <span className='text-[#2a2a2e] text-[14px] font-[700] leading-3'>{item.maPhong}</span></li>
                                                    <li><span className='font-[200]'>Mã số người dùng:</span> <span className='text-[#2a2a2e] text-[14px] font-[700] leading-3'>{item.maNguoiDung}</span></li>
                                                    <li><span className='font-[200]'>Số lượng người đi:</span> <span className='text-[#2a2a2e] text-[14px] font-[700] leading-3'>{item.soLuongKhach}</span></li>
                                                </ul>
                                                <div className='flex flex-row items-center'>
                                                    <CheckCircleTwoTone twoToneColor="#52c41a" />
                                                    <span className='text-[#52c41a] ml-2 text-[14px] font-[500]'>Hoàn tất</span>
                                                </div>
                                            </div>
                                            <div className='p-3'>
                                                <div className='flex flex-row w-[200px] h-[80px]'>
                                                    <div className='w-1/2 border-r-[1px] text-center'>
                                                        <span className='text-[14px] font-[200] leading-1 text-[#737373] tracking-[0.4px]'>NHẬN PHÒNG</span>
                                                        <div className='flex flex-row justify-center items-center'>
                                                            <div className='text-[30px] font-[200] text-[#737373] tracking-[1.2px]'>
                                                                {newNgayDen.date()}
                                                            </div>
                                                            <div>
                                                                <div className='text-[14px] font-[200] leading-1 text-[#737373] tracking-[0.4px]'>thg {newNgayDen.month()}</div>
                                                                <div className='text-[14px] font-[200] leading-1 text-[#737373] tracking-[0.4px]'>Th {newNgayDen.day()}</div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <div className='w-1/2 border-l-[1px] text-center'>
                                                        <span className='text-[14px] font-[200] leading-1 text-[#737373] tracking-[0.4px]'>TRẢ PHÒNG</span>
                                                        <div className='flex flex-row justify-center items-center'>
                                                            <div className='text-[30px] font-[200] text-[#737373] tracking-[1.2px]'>
                                                                {newNgayDi.date()}
                                                            </div>
                                                            <div>
                                                                <div className='text-[14px] font-[200] leading-1 text-[#737373] tracking-[0.4px]'>thg {newNgayDi.month()}</div>
                                                                <div className='text-[14px] font-[200] leading-1 text-[#737373] tracking-[0.4px]'>Th {newNgayDi.day()}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex flex-row justify-between h-[57px] items-center border-[1px] '>
                                            <div className='text-[#5a90f5] font-[700] text-[14px] mx-3'>Gửi bài đánh giá của quý khách</div>
                                            <div>
                                                <Button className='mx-3 bg-[#5a90f5] text-white rounded-[3px] leading-2'>Xem chi tiết</Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

        },
        {
            key: '2',
            label:
                <Link to={'/profile'}>
                    <div className='flex flex-row items-center hover:text-white hover:bg-[#669efa] px-10 h-[40px]'>
                        <PermIdentityIcon className='mr-2'></PermIdentityIcon>
                        <span className='text-[15px] font-[700] leading-2'>Hồ sơ của tôi</span>
                    </div>
                </Link>,
            children: `Content of Tab Pane 2`,
        },
        {
            key: '3',
            label: `Tab 3`,
            children: `Content of Tab Pane 3`,
        },
    ];
    return (
        <>
            <h1 className='ml-72'>Danh sách phòng đã đặt</h1>
            {/*  */}
            <div className='w-full mx-auto'>
                <Tabs
                    tabPosition='left'
                    defaultActiveKey="1"
                    items={items}
                    tabBarStyle={{ marginLeft: '10%', width: '15%', marginRight: '0px', paddingRight: '0px' }}
                />
            </div>
            {/*  */}
        </>
    )
}
