import React from 'react'
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { useParams, useNavigate, Link, NavLink } from "react-router-dom";
import { postUserSignup } from 'store/slices/AuthSlices';
import '../styles/pages/_signup.scss';

export default function SignUp() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isStatusSignin, userCurrent, isError, error } = useAppSelector((state: any) => {
    return state.auth;
  })

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [birthday, setBirthday] = useState('');
  const [gender, setGender] = useState('');
  const [role, setRole] = useState('');

  const [messagesError, setMessagesError] = useState('');

  const handleName = (event: any) => {
    setName(event.target.value)
  }
  const handleEmail = (event: any) => {
    setEmail(event.target.value)
  }
  const handlePassword = (event: any) => {
    setPassword(event.target.value)
  }
  const handlePhone = (event: any) => {
    setPhone(event.target.value)
  }
  const handleBirthday = (event: any) => {
    setBirthday(event.target.value)
  }
  const handleGender = (event: any) => {
    setGender(event.target.value)
  }
  const handleRole = (event: any) => {
    setRole(event.target.value)
  }

  const handleSubmit = (event: any) => {
    event.preventDefault();
    dispatch(postUserSignup({ id: '0', name, email, password, phone, birthday, gender, role }))
  }

  useEffect(() => {
    setMessagesError(error)
  })
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
                  onChange={handleName}
                />
              </fieldset>
              <fieldset className="form_group">
                <input
                  className="form_control"
                  type="text"
                  placeholder="Your Email"
                  onChange={handleEmail}
                />
              </fieldset>
              <fieldset className="form_group">
                <input
                  className="form_control"
                  type="password"
                  placeholder="Password"
                  onChange={handlePassword}
                />
              </fieldset>
              <fieldset className="form_group">
                <input
                  className="form_control"
                  type="text"
                  placeholder="Your Phone"
                  onChange={handlePhone}
                />
              </fieldset>
              <fieldset className="form_group">
                <input
                  className="form_control"
                  type="text"
                  placeholder="Your birthday"
                  onChange={handleBirthday}
                />
              </fieldset>
              <fieldset className="form_group">
                <input
                  className="form_control"
                  type="text"
                  placeholder="Your gender"
                  onChange={handleGender}
                />
              </fieldset>
              <fieldset className="form_group">
                <input
                  className="form_control"
                  type="text"
                  placeholder="Your role"
                  onChange={handleRole}
                />
              </fieldset>

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
