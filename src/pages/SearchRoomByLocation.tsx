import React from 'react'
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { getRoomsByLocation } from '../store/slices/RoomSlices';
import { useParams, useNavigate, Link, NavLink } from "react-router-dom";
import RoomsComponent from 'components/RoomsComponent';
import { Rate, Tag } from 'antd';
import { Button, Skeleton, Space } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import BedIcon from '@mui/icons-material/Bed';
import BathroomIcon from '@mui/icons-material/Bathroom';
import AcUnitIcon from '@mui/icons-material/AcUnit';



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

    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    }, [setLoading])

    return (
        <div className='my-3'>
            <div className='flex flex-row w-[60%] mx-auto'>
                <div className='w-3/12'>
                    <div>
                        <div>
                            <img className='w-[261px] h-[102px]' src="https://cdn6.agoda.net/images/MAPS-1213/default/bkg-map-entry.svg" alt="" />
                        </div>
                    </div>
                </div>
                <div className='w-9/12 h-full'>
                    <div className='flex flex-row bg-[#2a2a2e] text-white text-[14px] h-[102px] justify-center items-center'>
                        <div className=''>
                            <img src="https://cdn6.agoda.net/images/kite-js/banner/special-offers-colored3.svg" alt="" />
                        </div>
                        <div>
                            <h5 className='font-[500]'>Nâng cấp trải nghiệm của quý khách với Khuyến mại đặc biệt Agoda</h5>
                            <p>Hưởng các lợi ích cao cấp như trải nghiệm bữa ăn đặc biệt, vé tham quan, và nâng hạng phòng với giá đáng ngạc nhiên</p>
                        </div>

                    </div>
                    <h1>Những chỗ nghỉ nổi bật khuyến nghị cho bạn:</h1>

                    <div id=''>
                        <div className=''>
                            {roomsByLocation.map((item: any) => {
                                return (
                                    <Link to={`/detailRoom/${item.id}`}>
                                        <Skeleton loading={loading}>
                                            <div className='w-full h-[255px] flex flex-row rounded-[8px] border-[1.5px] m-2'>
                                                <div className='w-[30%]'>
                                                    <img className='w-full h-full' src={item.hinhAnh} alt="" />
                                                </div>
                                                <div className='w-1/2 flex flex-col border-r-[2px] p-3'>
                                                    <div className='h-[80%]'>
                                                        <h3 className='text-[20px] leading-1 font-[600]'>{item.tenPhong}</h3>
                                                        <Space>
                                                            <Rate className='text-[#fb587d] text-[14px]' disabled defaultValue={5} />
                                                            <EnvironmentOutlined className='text-[#5392f9]' />
                                                            <p className='text-[#5392f9] text-[12px] font-[500] leading-3 mt-2'>Việt Nam</p>
                                                        </Space>
                                                        <div>
                                                            {item.mayGiat ? <Tag color="magenta">Máy giặt</Tag> : <></>}
                                                            {item.banLa ? <Tag color="red">Bàn là</Tag> : <></>}
                                                            {item.tivi ? <Tag color="volcano">Tivi</Tag> : <></>}
                                                        </div>
                                                        <div>
                                                            <Tag color="green">Du lịch bền vững</Tag>
                                                        </div>
                                                        <div>
                                                            <div className='text-[#28871c] font-[500]'><EnvironmentOutlined className='text-[#28871c]' />Giá tốt nhất cho khách sạn 5 sao</div>
                                                            <div className='text-[#28871c] font-[500]'><AcUnitIcon className='text-[#28871c]' />Lý tưởng cho lưu trú dài hạn</div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className='flex'>
                                                            <div className='border-r-[2px] font-[500] p-2'>Điểm nổi bật nhất</div>
                                                            <div className='flex p-2'>
                                                                <div><MeetingRoomIcon></MeetingRoomIcon>x{item.phongNgu}</div>
                                                                <div><BedIcon></BedIcon>x{item.giuong}</div>
                                                                <div><BathroomIcon></BathroomIcon>x{item.phongTam}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='w-[20%] text-right pt-6 pr-3'>
                                                    <div className='flex flex-col'>
                                                        <div className=''>
                                                            <span className='text-[14px] font-[500]'>Tuyệt vời!!!</span>
                                                            <Tag color="#108ee9">Ưu đãi trong nước</Tag>
                                                        </div>

                                                        <div className=''>
                                                            <span className='text-[#737373] text-[12px] leading-3'>Giá mỗi đêm rẻ nhất từ</span>
                                                            <br />
                                                            <span className='text-[#e12d2d] font-[500] leading-[22px]'>{(item.giaTien * 23000 * 1).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</span>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </Skeleton>
                                    </Link>

                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
