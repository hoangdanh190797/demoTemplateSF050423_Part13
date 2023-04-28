import React from 'react'
import { Button, Dropdown, Space } from 'antd';


export default function HeaderExtra() {
  return (
    <div className='h-[56px] bg-[#FDEEE6] flex justify-center items-center'>
        <div className='mr-2'>
            <img src="https://img.agoda.net/images/INTTRV-45/default/Bags-heart_2021-09-30.svg" alt="" />
        </div>
        <div className='mr-2'>
            <p>
                Đi ra nước ngoài ư? Hãy tìm hiểu những thông tin cập nhật về các hạn chế và hướng dẫn đi lại thời COVID-19
            </p>
        </div>
        <div>
            <Button className='bg-white text-blue-600 border-blue-600 hover:text-white hover:bg-blue-600'>Tìm hiểu thêm</Button>
        </div>
    </div>
  )
}
