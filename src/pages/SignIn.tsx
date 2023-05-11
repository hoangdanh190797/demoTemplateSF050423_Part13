import React from 'react'
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { useParams, useNavigate, Link, NavLink } from "react-router-dom";
import { postUserSignin, checkSignInRejected } from 'store/slices/AuthSlices';
import { getLocation } from 'store/slices/LocationSlices';
import '../styles/pages/_signin.scss';
import { Spin } from 'antd';
import { Tabs } from 'antd';

import validator from 'validator';

import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

import Check from '../assets/images/Check.svg'

export default function SignIn() {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isStatusSignin, userCurrent, isError, error } = useAppSelector((state: any) => {
    return state.auth;
  })

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [messagesError, setMessagesError] = useState('');
  // const [errors, setErrors] = useState([]);
  // const [errors, setErrors] = useState<{ email?: string, password?: string }>({});


  const handleEmail = (event: any) => {
    setEmail(event.target.value)
  }
  const handlePassword = (event: any) => {
    setPassword(event.target.value)
  }
  const [loading, setLoading] = useState(false);
  // const [errors, setErrors] = useState({});

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (!validator.isEmail(email)) {
      // Handle invalid email
      // setErrors('Invalid email')
      return;
    }
    if (!validator.isStrongPassword(password)) {
      // Handle weak password
      // errors.push('Password must contain at least 8 characters including uppercase, lowercase, and special characters');
      return;
    }
    dispatch(postUserSignin({ email, password }))
  }

  const { isSignInpRejected } = useAppSelector((state: any) => {
    return state.auth;
  })
  console.log(isSignInpRejected)

  useEffect(() => {
    setMessagesError(error)

  }, [setMessagesError, setLoading])
  if (isSignInpRejected) {
    setTimeout(() => {
      dispatch(checkSignInRejected())
      console.log(isSignInpRejected)
    }, 3000)
  }
  if (isStatusSignin) {
    setTimeout(() => {
      navigate('/');
    }, 3000)
    localStorage.setItem('accessToken', userCurrent.token)
    localStorage.setItem('isRole', userCurrent.user.role)
    localStorage.setItem('idUser', userCurrent.user.id)
  }
  const errors: any = [];

  if (!validator.isEmail(email)) {
    errors.push('Invalid email');
  }
  if (!validator.isStrongPassword(password)) {
    errors.push('Password must contain at least 8 characters including uppercase, lowercase, and special characters');
  }

  return (
    <>
      <div className='w-[50%] mx-auto'>
        <div className="">
          <div className="">
            <div className="">
              {isSignInpRejected ? <Stack sx={{ width: '32%' }} spacing={2} style={{ position: 'absolute', right: '0px' }}>
                <Alert severity="error">Đăng nhập thất bại</Alert>
              </Stack> : ''}
              {isStatusSignin ? <Stack sx={{ width: '32%' }} spacing={2} style={{ position: 'absolute', right: '0px' }}>
                <Alert severity="success">Đăng nhập thành công</Alert>
              </Stack> : ''}

              <div className='flex w-full border border-[2px] m-5'>
                {/*  */}
                <div className='w-1/2 p-4'>
                  <h3 className='text-[24px] leading-2 font-[500]'>Đăng nhập</h3>
                  <h6 className=''>Để đảm bảo an toàn, xin vui lòng đăng nhập để truy cập vào thông tin</h6>
                  <Tabs
                    defaultActiveKey="1"
                    centered
                    items={[
                      {
                        label: <div className='w-[180px] text-center' >EMAIL</div>,
                        key: '1',
                        children:
                          <form action="" onSubmit={handleSubmit}>
                            <div>
                              <span className='inline-block mb-2'>Email</span>
                              <fieldset className="mb-2">
                                <input
                                  className="w-full h-[40px] border border-[1px] rounded-[4px]"
                                  type="email"
                                  name='email'
                                  placeholder="Email"
                                  onChange={handleEmail}
                                />
                              </fieldset>
                            </div>

                            <div>
                              <span className='inline-block mb-2'>Mật khẩu</span>
                              <fieldset className="mb-2">
                                <input
                                  className="w-full h-[40px] border border-[1px] rounded-[4px]"
                                  type="password"
                                  name='password'
                                  placeholder="Mật khẩu"
                                  onChange={handlePassword}
                                />
                              </fieldset>
                            </div>

                            <div>
                              {isError ? <p style={{ color: 'red' }}>{error?.data?.content}</p> : ""}
                              {errors.map((error: any) => (
                                <div style={{ color: 'red' }} key={error}>{error}</div>
                              ))}
                            </div>
                            <div className='mb-2'>
                              <button className='w-full h-[44px] rounded-[4px] bg-[#5392f9] text-[14px] font-[500] text-[#ffffff] hover:bg-[#7babfb]' type='submit' >Đăng nhập
                                {isSignInpRejected ? <Spin tip=" " size="large">
                                  <div style={{
                                    backgroundColor: 'rgba(0, 0, 0, 0.05)',
                                    borderRadius: '4px',
                                  }} />
                                </Spin > : ""}
                              </button>
                            </div>
                            <div className='mb-2'>
                              <ul className='text-[#5392f9] flex justify-between'>
                                <li>Tạo tài khoản</li>
                                <li>Quên mật khẩu</li>
                              </ul>
                            </div>

                          </form>,
                      },
                      {
                        label: <div className='w-[180px] text-center' >DI ĐỘNG</div>,
                        key: '2',
                        children: 'Tab 3',
                      },
                    ]}
                  />
                  <div className='flex flex-row items-center mb-2'>
                    <div className='w-[30%]'><hr /></div>
                    <span className='w-[35%] text-center text-[14px]'>
                      hoặc đăng nhập bằng
                    </span>
                    <div className='w-[30%]'><hr /></div>
                  </div>
                  <div>
                    <button className='w-full h-[48px] border border-[#5392f9] rounded-[4px] mb-2 bg-white text-[14px] font-[500] text-[#5392f9] hover:bg-[#7babfb]'>Google
                    </button>
                    <div className='flex justify-between'>
                      <button className='w-[49%] h-[48px] border border-[#5392f9] rounded-[4px] bg-white text-[14px] font-[500] text-[#5392f9] hover:bg-[#7babfb]'>Facebook
                      </button>
                      <button className='w-[49%] h-[48px] border border-[#5392f9] rounded-[4px] bg-white text-[14px] font-[500] text-[#5392f9] hover:bg-[#7babfb]'>Apple
                      </button>
                    </div>
                    <div>
                      <p>Khi đăng nhập, tôi đồng ý với các <a href="" className='text-blue-500'>Điều khoản sử dụng</a> và <a href="" className='text-blue-500'>Chính sách bảo mật</a> của Agoda</p>
                    </div>
                  </div>
                </div>
                {/*  */}
                <div className='w-1/2 h-[700px] bg-[#f8f7f9] relative'>
                  <div className='bg-[#dde9fd] flex justify-center'>
                    <img className='' src="https://cdn0.agoda.net/images/agodavip/signupcage.svg" alt="" />
                  </div>
                  <div className='absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-5%] w-full p-5'>
                    <div>
                      <span className='text-[24px] leading-1 font-[500]'>Đăng nhập để mở khóa nhiều lợi ích hơn!</span>
                    </div>
                    <ul className=''>
                      <li className='flex items-center'>
                        <div className='mr-2 w-1/12'>
                          <img className='w-8 h-8' src={Check} alt="" />
                        </div>

                        <div className='text-[16px]'>
                          Đảm Bảo Giá Tốt Nhất cho các đơn đặt phòng
                        </div>
                      </li>
                      <li className='flex items-center'>
                        <div className='mr-2 w-1/12'>
                          <img className='w-8 h-8' src={Check} alt="" />
                        </div>

                        <div className='text-[16px]'>
                          Tiếp cận các ưu đãi Nội bộ và VIP tốt nhất của chúng tôi
                        </div>
                      </li>
                      <li className='flex items-center'>
                        <div className='mr-2 w-1/12'>
                          <img className='w-8 h-8' src={Check} alt="" />
                        </div>

                        <div className='text-[16px]'>
                          Kiếm Tiền Agoda để tiết kiệm hơn nữa
                        </div>
                      </li>
                      <li className='flex items-center'>
                        <div className='mr-2 w-1/12'>
                          <img className='w-8 h-8' src={Check} alt="" />
                        </div>

                        <div className='text-[16px]'>
                          Thu thập các lượt đặt phòng, tiến đến hạng VIP kế tiếp của quý khách
                        </div>
                      </li>
                    </ul>
                  </div>

                </div>
              </div>





              

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

//--------
{/* <form action="" onSubmit={handleSubmit}>
                <fieldset className="">
                  <input
                    className=""
                    type="email"
                    name='email'
                    placeholder="Your Email"
                    onChange={handleEmail}
                  />
                </fieldset>
                <fieldset className="">
                  <input
                    className=""
                    type="password"
                    name='password'
                    placeholder="Password"
                    onChange={handlePassword}
                  />
                </fieldset>
                <div>
                  {isError ? <p style={{ color: 'red' }}>{error?.data?.content}</p> : ""}
                  {errors.map((error: any) => (
                    <div style={{ color: 'red' }} key={error}>{error}</div>
                  ))}
                </div>
                <div className='btn_'>
                  <button type='submit' >Sign in
                    {isSignInpRejected ? <Spin tip=" " size="large">
                      <div style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.05)',
                        borderRadius: '4px',
                      }} />
                    </Spin > : ""}
                  </button>
                </div>
              </form> */}