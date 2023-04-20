import React from 'react'
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { useParams, useNavigate, Link, NavLink } from "react-router-dom";
import { postUserSignup } from 'store/slices/AuthSlices';
import '../styles/pages/_signup.scss';
import ValidateSignupForm from 'components/ValidateSignupForm';
import { isEmpty } from 'lodash';
// import { Alert } from 'antd';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

import { checkSignUpRejected, checkSignUpFulfilled } from '../store/slices/AuthSlices'
import { Spin } from 'antd';

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

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [birthday, setBirthday] = useState('');
  const [gender, setGender] = useState('');
  const [role, setRole] = useState('');

  const [messagesError, setMessagesError] = useState('');

  // const handleName = (event: any) => {
  //   setName(event.target.value)
  // }
  // const handleEmail = (event: any) => {
  //   setEmail(event.target.value)
  // }
  // const handlePassword = (event: any) => {
  //   setPassword(event.target.value)
  // }
  // const handlePhone = (event: any) => {
  //   setPhone(event.target.value)
  // }
  // const handleBirthday = (event: any) => {
  //   setBirthday(event.target.value)
  // }
  // const handleGender = (event: any) => {
  //   setGender(event.target.value)
  // }
  const handleRole = (event: any) => {
    setRole(event.target.value)
  }
  // useEffect(() => {
  //   // if(SttSignUp){
  //   //   const timerSignUp = setTimeout(() => {
  //   //     setSttSignUp(false);
  //   //     navigate('/signin');
  //   //     // history.push("/home");
  //   //   }, 3000);
  //   //   return () => clearTimeout(timerSignUp);
  //   // };
  //   // if(SttSignUpRejected){
  //   //   const timerSignUpReject = setTimeout(() => {
  //   //     setSttSignUpRejected(false);
  //   //     // history.push("/home");
  //   //   }, 3000);
  //   //   return () => clearTimeout(timerSignUpReject);
  //   // };
  // }, [SttSignUpRejected])
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
  //Bị kẹt chỗ này là vầy nè: ban đầu nó lấy từ state luôn
  const { isStatusSignup, isSignupRejected } = useAppSelector((state: any) => { return state.auth })
  console.log(isSignupRejected)
  // console.log(isStatusSignup)
  const [checkSignUp, setCheckSignUp] = useState<any>()
  // console.log(checkSignUp)

  const [flag, setFlag] = useState(isSignupRejected)
  console.log(flag)

  useEffect(() => {
    if(isStatusSignup){
      setTimeout(() => {
        setIsLoading(false)
        dispatch(checkSignUpFulfilled())
        navigate('/signin')
      },3000)
    }
    if(isSignupRejected)
    {
      setTimeout(() =>{
          setIsLoading(false)
         dispatch(checkSignUpRejected())
      },3000)
    }
  })
  console.log(checkSignUp)
  // useEffect(() => {
  //   setCheckSignUp(isSignupRejected)
  // })

  // let checkSignUpAgain = isSignupRejected

  // useEffect(() => {
  //   if (checkSignUp) {
  //     const timer =
  //       setTimeout(() => {
  //         setCheckSignUp(false);
  //       }, 4000);
  //     return () => clearTimeout(timer);
  //   }
  // }, [setTimeout, setCheckSignUp])

  // useEffect(() => {
  //   if (SttSignUpRejected) {
  //     const timer =
  //       setTimeout(() => {
  //         setSttSignUpRejected(false);
  //         //  history.push("/home");
  //       }, 3000);
  //     return () => clearTimeout(timer);
  //   }
  // }, [SttSignUpRejected, setSttSignUpRejected]);

  // useEffect(() => {
  //   setMessagesError(error)
  // })
  //useEffect sp get Error

  // if (isStatusSignin) {
  //   navigate('/');
  //   localStorage.setItem('accessToken', JSON.stringify(userCurrent.token))
  // }
  // const [SttSignUpRejected, setSttSignUpRejected] = useState(isStatusSignupRejected)
  // if(SttSignUpRejected){
  //   setTimeout(() => {
  //     setSttSignUpRejected(false);
  //   }, 3000)
  // }

  return (
    <div id='signup_pages'>
      <div className="signup_container">
        <div className="signup_box">
          <div className="signup_content">
            {isStatusSignup ?<Stack sx={{ width: '20%' }} spacing={2} style={{position:'absolute', right:'0px'}}>
              <Alert severity="success">Đăng ký thành công</Alert>
            </Stack>: '' }
            {isSignupRejected ? <Stack sx={{ width: '20%' }} spacing={2} style={{ position: 'absolute', right: '0px' }}>
              <Alert severity="error">Đăng ký thất bại</Alert>
            </Stack> : ''}
            <h1>Sign up</h1>
            <p>
              <Link to={'/signup'}>
                <a href=''>Have an account?</a>
              </Link>
            </p>

            <form onSubmit={handleSubmit}>

              <fieldset className="form_group">
                <input
                  className="form_control"
                  type="text"
                  placeholder="Your Name"
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                {errors.name && <span>{errors.name}</span>}
              </fieldset>
              <fieldset className="form_group">
                <input
                  className="form_control"
                  type="text"
                  placeholder="Your Email"
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                {errors.email && <span>{errors.email}</span>}

              </fieldset>
              <fieldset className="form_group">
                <input
                  className="form_control"
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                {errors.password && <span>{errors.password}</span>}

              </fieldset>
              <fieldset className="form_group">
                <input
                  className="form_control"
                  type="text"
                  placeholder="Your Phone"
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
                {errors.phone && <span>{errors.phone}</span>}

              </fieldset>
              <fieldset className="form_group">
                <input
                  className="form_control"
                  type="text"
                  placeholder="Your birthday"
                  onChange={(e) => setFormData({ ...formData, birthday: e.target.value })}
                />
                {errors.birthday && <span>{errors.birthday}</span>}

              </fieldset>
              <fieldset className="form_group">
                {/* <input
                  className="form_control"
                  type="text"
                  placeholder="Your gender"
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                /> */}
                <select id="" name="gender" onChange={(e) => setFormData({ ...formData, gender: e.target.value })}>
                  <option value='true'>Male</option>
                  <option value='false'>Female</option>
                </select>
                {errors.gender && <span>{errors.gender}</span>}

              </fieldset>
              {/* <fieldset className="form_group">
                <input
                  className="form_control"
                  type="text"
                  placeholder="Your role"
                  onChange={handleRole}
                  // Use handleRole to get data user input
                />
              </fieldset> */}

              <div>
                {isError ? <p>{error.data.content}</p> : ""}
              </div>

              <div className='btn_'>
                <button type='submit'>Sign up
                {isloading ? <Spin tip=" " size="large">
                      <div style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.05)',
                        borderRadius: '4px',
                      }} />
                    </Spin > : ""}
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
