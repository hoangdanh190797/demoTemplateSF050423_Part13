import React, { useEffect, useState } from 'react'
import { useAddToHomescreenPrompt } from 'hooks/useAddToHomescreenPrompt'

import Header from '../components/Header'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'
import ButtonAddToHomeScreen from '../components/ButtonAddToHomeScreen'


export default function HomeTemplate() {

  const [prompt, promptToInstall] = useAddToHomescreenPrompt();
  const [isVisible, setVisibleState] = React.useState(false);

  const hide = () => setVisibleState(false);

  React.useEffect(
    () => {
      if (prompt) {
        setVisibleState(true);
      }
    },
    [prompt]
  );
  // if (!isVisible) {
  //   return <div />;
  // }


  return (
    <div className=''>
      <div onClick={hide}>
        <button onClick={hide}>Close</button>
        Hello! Wanna add to homescreen?
        <button onClick={promptToInstall}>Add to homescreen</button>
      </div>

      {/* Header */}
      <Header />

      {/* Content */}
      <div className=''>
        <Outlet />
      </div>

      {/* Footer */}
      <div className=''>
        <Footer />
      </div>
    </div>
  )
}
