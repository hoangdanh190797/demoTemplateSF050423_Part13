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
    <>
      <div onClick={hide}>
        <button onClick={hide}>Close</button>
        Hello! Wanna add to homescreen?
        <button onClick={promptToInstall}>Add to homescreen</button>
      </div>

      {/* <div onClick={hide}>
        <button style={{ position: 'fixed', bottom: '20px', right: '20px', backgroundColor: '#007bff', color: '#fff', border: 'none', padding: '10px 20px', fontSize: '16px', cursor: 'pointer', zIndex: '999' }} onClick={promptToInstall}>Add to homescreen</button>
      </div> */}

      {/* Header */}
      <Header />

      {/* Content */}
      <Outlet />

      {/* Footer */}
      <Footer />
    </>
  )
}
