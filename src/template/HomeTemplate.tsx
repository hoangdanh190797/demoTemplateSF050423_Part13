import React, { useEffect, useState } from 'react'

import Header from '../components/Header'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'
import ButtonAddToHomeScreen from '../components/ButtonAddToHomeScreen'


export default function HomeTemplate() {
  const [promptEvent, setPromptEvent] = useState<any>(null);

  useEffect(() => {
    const handler = (event: any) => {
      event.preventDefault();
      setPromptEvent(event);
      console.log(event)
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);
  return (
    <>
      {promptEvent && (
        <ButtonAddToHomeScreen promptEvent={promptEvent} />
      )}
      {/* Header */}
      <Header />

      {/* Content */}
      <Outlet />

      {/* Footer */}
      <Footer />
    </>
  )
}
