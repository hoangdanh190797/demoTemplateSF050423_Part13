import React from 'react'
import '../styles/components/_roomsComponent.scss';

export default function RoomsComponent(props: any) {
  const { tenPhong, giaTien, hinhAnh } = props
  return (
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

  )
}
