import React from 'react'
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { useParams, useNavigate, Link, NavLink } from "react-router-dom";
import { postUserSignup } from 'store/slices/AuthSlices';
import ValidateSignupForm from 'components/ValidateSignupForm';
import { isEmpty } from 'lodash';
// import { Alert } from 'antd';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Check from '../assets/images/Check.svg'


import { checkSignUpRejected, checkSignUpFulfilled } from '../store/slices/AuthSlices'
import { Spin } from 'antd';
import '../styles/pages/_signup.scss';

export default function SignUp() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isStatusSignin, userCurrent, isError, error, } = useAppSelector((state: any) => {
    return state.auth;
  })

  interface ValidationErrors {
    name?: string,
    email?: string,
    password?: string,
    phone?: string,
    birthday?: string,
    gender?: string,
  }

  const [formData, setFormData] = useState({

    name: '',
    email: '',
    password: '',
    phone: '',
    birthday: '',
    gender: '',
  })

  const [errors, setErrors] = useState<ValidationErrors>({
    name: '',
    email: '',
    password: '',
    phone: '',
    birthday: '',
    gender: '',
  })

  // const [name, setName] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [phone, setPhone] = useState('');
  // const [birthday, setBirthday] = useState('');
  // const [gender, setGender] = useState('');
  // const [role, setRole] = useState('');

  // const [messagesError, setMessagesError] = useState('');

  // const handleRole = (event: any) => {
  //   setRole(event.target.value)
  // }

  const [isloading, setIsLoading] = useState(false)
  const handleSubmit = (event: any) => {
    event.preventDefault();
    //Check validation in here

    const validationErrors = ValidateSignupForm(formData);
    let hasErrors = false;
    for (const key in validationErrors) {
      if (validationErrors[key as keyof ValidationErrors] !== '') {
        hasErrors = true;
        break;
      }
    }
    setErrors(validationErrors);
    if (!hasErrors) {
      // submit the form
      dispatch(postUserSignup({ ...formData, id: '0', role: 'USER', }))
      setIsLoading(true)
      // setCheckSignUp(isSignupRejected)
    }
  }
  const { isStatusSignup, isSignupRejected } = useAppSelector((state: any) => { return state.auth })
  console.log(isSignupRejected)
  const [checkSignUp, setCheckSignUp] = useState<any>()

  const [flag, setFlag] = useState(isSignupRejected)
  console.log(flag)

  useEffect(() => {
    if (isStatusSignup) {
      setTimeout(() => {
        setIsLoading(false)
        dispatch(checkSignUpFulfilled())
        navigate('/signin')
      }, 3000)
    }
    if (isSignupRejected) {
      setTimeout(() => {
        setIsLoading(false)
        dispatch(checkSignUpRejected())
      }, 3000)
    }
  })
  console.log(checkSignUp)
  return (
    <>
      <div className='w-[50%] mx-auto'>
        <div className="">
          <div className="">
            <div className="">
              {isStatusSignup ? <Stack sx={{ width: '32%' }} spacing={2} style={{ position: 'absolute', right: '0px' }}>
                <Alert severity="success">Đăng ký thành công</Alert>
              </Stack> : ''}
              {isSignupRejected ? <Stack sx={{ width: '32%' }} spacing={2} style={{ position: 'absolute', right: '0px' }}>
                <Alert severity="error">Đăng ký thất bại</Alert>
              </Stack> : ''}

              <div className='flex w-full border border-[2px] m-5'>
                {/*  */}
                <div className='w-1/2 p-4'>
                  <h3 className='text-[24px] leading-2 font-[500]'>Đăng ký</h3>
                  {/*  */}
                  <form onSubmit={handleSubmit} >
                    <div>
                      <span className='inline-block mb-2'>Tên</span>
                      <fieldset className="mb-2">
                        <input
                          className="w-full h-[40px] border border-[1px] rounded-[4px]"
                          type="text"
                          placeholder="Tên"
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                        {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
                      </fieldset>
                    </div>
                    {/*  */}
                    <div>
                      <span className='inline-block mb-2'>Email</span>
                      <fieldset className="mb-2">
                        <input
                          className="w-full h-[40px] border border-[1px] rounded-[4px]"
                          type="text"
                          placeholder="Email"
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                        {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}

                      </fieldset>
                    </div>
                    {/*  */}
                    <div>
                      <span className='inline-block mb-2'>Mật khẩu</span>
                      <fieldset className="mb-2">
                        <input
                          className="w-full h-[40px] border border-[1px] rounded-[4px]"
                          type="password"
                          placeholder="Mật khẩu"
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                        {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}
                      </fieldset>
                    </div>
                    {/*  */}
                    <div>
                      <span className='inline-block mb-2'>Số điện thoại</span>
                      <fieldset className="mb-2">
                        <input
                          className="w-full h-[40px] border border-[1px] rounded-[4px]"
                          type="text"
                          placeholder="Số điện thoại"
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                        {errors.phone && <span style={{ color: 'red' }}>{errors.phone}</span>}
                      </fieldset>
                    </div>
                    {/*  */}
                    <div>
                      <span className='inline-block mb-2'>Ngày sinh</span>
                      <fieldset className="mb-2">
                        <input
                          className="w-full h-[40px] border border-[1px] rounded-[4px]"
                          type="text"
                          placeholder="Ngày sinh"
                          onChange={(e) => setFormData({ ...formData, birthday: e.target.value })}
                        />
                        {errors.birthday && <span style={{ color: 'red' }}>{errors.birthday}</span>}
                      </fieldset>
                    </div>
                    {/*  */}
                    <div>
                      <span className='inline-block mb-2'>Giới tính</span>
                      <fieldset className="mb-2">
                        <select className="w-full h-[40px] border border-[1px] rounded-[4px]" id="" name="gender" onChange={(e) => setFormData({ ...formData, gender: e.target.value })}>
                          <option value='true'>Nam</option>
                          <option value='false'>Nữ</option>
                        </select>
                        {errors.gender && <span style={{ color: 'red' }}>{errors.gender}</span>}
                      </fieldset>
                    </div>
                    <div>
                      <p className='text-center'><a href="" className='hover:text-blue-500'>Nhận email khuyến mãi độc quyền từ Agoda. Tôi có thể bỏ đăng ký này về sau như đã nêu trong Chính sách Bảo mật</a></p>
                    </div>
                    <div>
                      {isError ? <p>{error?.data?.content}</p> : ""}
                    </div>
                    {/*  */}
                    <div className='mb-2'>
                      <button className='w-full h-[44px] rounded-[4px] bg-[#5392f9] text-[14px] font-[500] text-[#ffffff] hover:bg-[#7babfb]' type='submit'>Đăng ký
                        {isloading ? <Spin tip=" " size="large">
                          <div style={{
                            backgroundColor: 'rgba(0, 0, 0, 0.05)',
                            borderRadius: '4px',
                          }} />
                        </Spin > : ""}
                      </button>
                    </div>
                  </form>
                  {/*  */}
                  <div className='flex flex-row items-center mb-2'>
                    <div className='w-[30%]'><hr /></div>
                    <span className='w-[35%] text-center text-[14px]'>
                      hoặc tiếp tục bằng
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
