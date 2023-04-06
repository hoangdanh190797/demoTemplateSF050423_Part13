import React from 'react'
import logoPNG from '../assets/images/logoPNG.png';
import global from '../assets/images/global.svg'
import threesf from '../assets/images/threesf.svg'
import person from '../assets/images/person.svg'
import '../styles/components/_header.scss'

export default function Header() {
    return (
        <>
            <div id='header_'>
                <div className='header_left'>
                    <div className='header_left_box_img'>
                        <img src={logoPNG} alt="logoImg" />
                    </div>
                </div>
                <div className='header_center'>
                    <div className='header_center_box_center'>
                        <div>Chỗ ở</div>
                        <div>Trải nghiệm</div>
                        <div>Trải nghiệm trực tuyến</div>
                    </div>

                </div>
                <div className='header_right'>
                    <div className='header_right_title'>
                        <button>Trở thành chủ nhà</button>
                    </div>
                    <div className='header_right_global'>
                        <button>
                            <img src={global} alt="" width={25} />
                        </button>
                    </div>
                    <div className='header_right_login'>
                        <button>
                            <div className='header_login_box'>
                                <div>
                                    <img src={threesf} alt="" width={25} />
                                </div>
                                <div>
                                    <img src={person} alt="" width={25} />
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
