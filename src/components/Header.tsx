import React from 'react'
import logoPNG from '../assets/images/logoPNG.png'
import '../styles/components/_header.scss'

export default function Header() {
  return (
    <>
        <div id='header_'>
            <div className='header_left'>
                <div>
                    <img src={logoPNG} alt="logoImg"/>
                </div>
            </div>
            <div className='header_center'>
                <span>Địa điểm bất kỳ</span>
                <span>Tuần bất kỳ</span>
                <span>Thêm khách</span>
            </div>
            <div className='header_right'>
                <span>Trở thành chủ nhà</span>
                <span>---</span>
            </div>
        </div>
    </>
  )
}
