import React from 'react'
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { useParams, useNavigate, Link, NavLink } from "react-router-dom";
import { postUserSignin, checkSignInRejected } from 'store/slices/AuthSlices';
import { getLocation } from 'store/slices/LocationSlices';
import '../styles/pages/_signin.scss';
import { Spin } from 'antd';

import validator from 'validator';

import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function SignIn() {

  // interface Values {
  //   email: String,
  //   password: String
  // }
  // const schema = Yup.object().shape({
  //   email: Yup.string()
  //     .email('Invalid email')
  //     .required('Email is required'),
  //   password: Yup.string()
  //     .required('Password is required')
  //     .min(8, 'Password must be at least 8 characters')
  //     .max(50, 'Password must be at most 50 characters')
  //     .matches(
  //       /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
  //       'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character'
  //     )
  // });
  // const formik = useFormik({
  //   initialValues: {
  //     name: '',
  //     email: '',
  //     age: 0,
  //   },
  //   validationSchema: schema,
  //   onSubmit: (values) => {
  //     console.log(values);
  //   },
  // });
  // const initialValues = {
  //   email: '',
  //   password: '',
  // };

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
    // setLoading(true)
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
      // dispatch(checkSignInRejected())
      navigate('/');
    }, 3000)
    localStorage.setItem('accessToken', userCurrent.token)
    localStorage.setItem('isRole', userCurrent.user.role)
    localStorage.setItem('idUser', userCurrent.user.id)
  }
  const errors :any = [];

  if (!validator.isEmail(email)) {
    errors.push('Invalid email');
  }
  if (!validator.isStrongPassword(password)) {
    errors.push('Password must contain at least 8 characters including uppercase, lowercase, and special characters');
  }
  
  return (
    <>
      <div id='signin_pages'>
        <div className="signin_container">
          <div className="signin_box">
            <div className="signin_content">
            {isSignInpRejected ?<Stack sx={{ width: '32%' }} spacing={2} style={{position:'absolute', right:'0px'}}>
              <Alert severity="error">Đăng nhập thất bại</Alert>
            </Stack>: '' }
            {isStatusSignin ? <Stack sx={{ width: '32%' }} spacing={2} style={{ position: 'absolute', right: '0px' }}>
              <Alert severity="success">Đăng nhập thành công</Alert>
            </Stack> : ''}
              <h1>Sign in</h1>
              <p>
                <Link to={'/signup'}>
                  <a href=''>Have an account?</a>
                </Link>
              </p>
              <form action="" onSubmit={handleSubmit}>
                <fieldset className="form_group">
                  <input
                    className="form_control"
                    type="email"
                    name='email'
                    placeholder="Your Email"
                    onChange={handleEmail}
                  />
                </fieldset>
                <fieldset className="form_group">
                  <input
                    className="form_control"
                    type="password"
                    name='password'
                    placeholder="Password"
                    onChange={handlePassword}
                  />
                </fieldset>
                <div>
                  {isError ? <p>{error.data.content}</p> : ""}
                  {errors.map((error:any) => (
                    <div key={error}>{error}</div>
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
