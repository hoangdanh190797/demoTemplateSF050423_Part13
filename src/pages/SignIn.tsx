import React from 'react'
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { useParams, useNavigate, Link, NavLink } from "react-router-dom";
import { postUserSignin } from 'store/slices/AuthSlices';
import { getLocation } from 'store/slices/LocationSlices';
import '../styles/pages/_signin.scss';


export default function SignIn() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isStatusSignin, userCurrent, isError, error } = useAppSelector((state: any) => {
    return state.auth;
  })

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [messagesError, setMessagesError] = useState('');

  const handleEmail = (event: any) => {
    setEmail(event.target.value)
  }
  const handlePassword = (event: any) => {
    setPassword(event.target.value)
  }
  const handleSubmit = (event: any) => {
    event.preventDefault();
    dispatch(postUserSignin({ email, password }))
  }

  useEffect(() => {
    setMessagesError(error)
  })
  //useEffect sp get Error

  if (isStatusSignin) {
    navigate('/');
    localStorage.setItem('accessToken', userCurrent.token)
    localStorage.setItem('isRole', userCurrent.user.role)
  }

  return (
    <div id='signin_pages'>
      <div className="signin_container">
        <div className="signin_box">
          <div className="signin_content">
            <h1>Sign in</h1>
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
              <div>
                {isError ? <p>{error.data.content}</p> : ""}
              </div>
              <div className='btn_'>
                <button type='submit' >Sign in</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
