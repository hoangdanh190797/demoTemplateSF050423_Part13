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

export default function SignUp() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isStatusSignin, userCurrent, isError, error, isStatusSignup, isStatusSignupRejected } = useAppSelector((state: any) => {
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

  const [SttSignUp, setSttSignUp] = useState(isStatusSignup)
  const [SttSignUpRejected, setSttSignUpRejected] = useState(isStatusSignupRejected)

 

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
  useEffect(() => {
    if (SttSignUpRejected) {
      const timer = setTimeout(() => {
        setSttSignUpRejected(false);
        // history.push("/home");
      }, 3000);
      return () => clearTimeout(timer);
    }
  },[SttSignUpRejected]);

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

    }
    // if (Object.keys(validationErrors).length === 0) {
    // }
    // console.log(formData)
  }
  

  // useEffect(() => {
  //   setMessagesError(error)
  // })
  //useEffect sp get Error

  if (isStatusSignin) {
    navigate('/');
    localStorage.setItem('accessToken', JSON.stringify(userCurrent.token))
  }

  return (
    <div id='signup_pages'>
      <div className="signup_container">
        <div className="signup_box">
          <div className="signup_content">
            {/* {SttSignUp ?<Stack sx={{ width: '20%' }} spacing={2} style={{position:'absolute', right:'0px'}}>
              <Alert severity="success">Đăng ký thành công</Alert>
            </Stack>: '' } */}
            {SttSignUpRejected ? <Stack sx={{ width: '20%' }} spacing={2} style={{position:'absolute', right:'0px'}}>
              <Alert severity="error">Đăng ký thất bại</Alert>
            </Stack> : '' }
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
                <button type='submit'>Sign up</button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
