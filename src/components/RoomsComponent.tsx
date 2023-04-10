import React from 'react'
import { Link } from 'react-router-dom'

import '../styles/components/_roomsComponent.scss';

export default function RoomsComponent(props: any) {
  const { tenPhong, giaTien, hinhAnh, id } = props
  return (
    <Link to={`/detailRoom/${id}`}>
      <div id='roomComponent_'>
        <div className='roomComponent_flexbasic'>
          <div className='roomComponent_box'>
            <img src={hinhAnh} alt="" />
            <span>{tenPhong}</span>
            <br />
            <span>${giaTien}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
