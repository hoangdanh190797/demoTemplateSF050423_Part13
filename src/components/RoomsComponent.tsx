import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Skeleton, Space } from 'antd';
import '../styles/components/_roomsComponent.scss';
import { Rate } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons'

export default function RoomsComponent(props: any) {
  const [loading, setLoading] = useState<boolean>(true);

  const { tenPhong, giaTien, hinhAnh, id } = props
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, [setLoading])
  return (
    <Link to={`/detailRoom/${id}`}>
      <div className=''>
        <div className='w-[278px] h-[330px]'>
          <Skeleton loading={loading}>
            <img className='w-[266px] h-[200px]' src={hinhAnh} alt="" />
            <span className='text-[14px] text-[#2a2a2e] font-[500] leading-5'>{tenPhong}</span>
            <br />
            <div>
              <Space>
                <Rate className='text-[#fb587d] text-[14px]' disabled defaultValue={5} />
                <EnvironmentOutlined className='text-[#5392f9]' />
                <p className='text-[#5392f9] text-[12px] font-[500] leading-3 mt-2'>Việt Nam</p>
              </Space>
            </div>
            <span className='text-[#737373] text-[12px] leading-3'>Giá mỗi đêm rẻ nhất từ</span>
            <br />
            <span className='text-[#e12d2d] font-[500] leading-[22px]'>{(giaTien * 23000 * 1).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</span>
        </Skeleton>
      </div>
    </div>
    </Link >



  )
}
