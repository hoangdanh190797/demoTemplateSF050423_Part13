import React from 'react'
import '../styles/components/_footer.scss'

export default function Footer() {
    return (
        <>
            <div className='bg-[#e9ebee] h-[256px] flex items-center'>
                <div className='flex justify-around w-[65%] mx-auto'>
                    <div>
                        <h5 className='text-[#2a2a2e] font-[500] leading-3 mx-[0px] my-[12px]'>Trợ giúp</h5>
                        <ul>
                            <li className='text-[14px] leading-4 text-[#2a2a2e]'>Trung tâm trợ giúp</li>
                            <li className='text-[14px] leading-4 text-[#2a2a2e]'>Câu hỏi thường gặp</li>
                            <li className='text-[14px] leading-4 text-[#2a2a2e]'>Chính sách Bảo mật</li>
                            <li className='text-[14px] leading-4 text-[#2a2a2e]'>Chính sách về cookie</li>
                            <li className='text-[14px] leading-4 text-[#2a2a2e]'>Điều khoản sử dụng</li>
                            <li className='text-[14px] leading-4 text-[#2a2a2e]'>Quản lý thiết lập cookie</li>
                        </ul>
                    </div>
                    <div>
                        <h5 className='text-[#2a2a2e] font-[500] leading-3 mx-[0px] my-[12px]'>Công ty</h5>
                        <ul>
                            <li className='text-[14px] leading-4 text-[#2a2a2e]'>Về chúng tôi</li>
                            <li className='text-[14px] leading-4 text-[#2a2a2e]'>Tuyển dụng</li>
                            <li className='text-[14px] leading-4 text-[#2a2a2e]'>Báo chí</li>
                            <li className='text-[14px] leading-4 text-[#2a2a2e]'>Nhật ký mạng</li>
                            <li className='text-[14px] leading-4 text-[#2a2a2e]'>PointMAX</li>
                        </ul>
                    </div>
                    <div>
                        <h5 className='text-[#2a2a2e] font-[500] leading-3 mx-[0px] my-[12px]'>Điểm du lịch</h5>
                        <ul>
                            <li className='text-[14px] leading-4 text-[#2a2a2e]'>Quốc gia</li>
                            <li className='text-[14px] leading-4 text-[#2a2a2e]'>Thành phố</li>
                        </ul>
                    </div>
                    <div>
                        <h5 className='text-[#2a2a2e] font-[500] leading-3 mx-[0px] my-[12px]'>Đối tác của chúng tôi</h5>
                        <ul>
                            <li className='text-[14px] leading-4 text-[#2a2a2e]'>Cổng thông tin đối tác YCS</li>
                            <li className='text-[14px] leading-4 text-[#2a2a2e]'>Partner Hub</li>
                            <li className='text-[14px] leading-4 text-[#2a2a2e]'>Quảng cáo trên Agoda</li>
                            <li className='text-[14px] leading-4 text-[#2a2a2e]'>Đối tác liên kết</li>
                            <li className='text-[14px] leading-4 text-[#2a2a2e]'>Đối tác kết nối</li>
                        </ul>
                    </div>
                    <div>
                        <h5 className='text-[#2a2a2e] font-[500] leading-3 mx-[0px] my-[12px]'>Tải ứng dụng</h5>
                        <ul>
                            <li className='text-[14px] leading-4 text-[#2a2a2e]'>Ứng dụng iOS</li>
                            <li className='text-[14px] leading-4 text-[#2a2a2e]'>Ứng dụng Android</li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}
