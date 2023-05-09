import React, { useEffect, useState } from 'react'

import Header from '../components/Header'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'
import ButtonAddToHomeScreen from '../components/ButtonAddToHomeScreen'


export default function HomeTemplate() {
  const [promptEvent, setPromptEvent] = useState<any>(null);
  const IS_BROWSER = typeof window !== 'undefined';


  useEffect(() => {
    if (IS_BROWSER) {
      const handler = (event: any) => {
        event.preventDefault();
        setPromptEvent(event);
        console.log(event)
      };
      window.addEventListener("beforeinstallprompt", handler);
      return () => {
        window.removeEventListener("beforeinstallprompt", handler);
      }
    };

  }, [promptEvent]);

  return (
    <>
      {promptEvent ? (
        <ButtonAddToHomeScreen promptEvent={promptEvent} />
      ) : <div>pla pla</div>}

      {/* Header */}
      <Header />

      {/* Content */}
      <Outlet />

      {/* Footer */}
      <Footer />
    </>
  )
}
