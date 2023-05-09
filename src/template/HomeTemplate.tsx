import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'
import ButtonAddToHomeScreen from '../components/ButtonAddToHomeScreen'
import { useAddToHomescreenPrompt } from 'hooks/useAddToHomescreenPrompt'


export default function HomeTemplate() {
  // const [promptEvent, setPromptEvent] = useState<any>(null);
  // const IS_BROWSER = typeof window !== 'undefined';

  // const handleClick = () => {
  //   promptEvent.prompt();
  // };

  // useEffect(() => {
  //   if (promptEvent !== null) {
  //     const handler = (event: any) => {
  //       event.preventDefault();
  //       setPromptEvent(event);
  //     };
  //     window.addEventListener("beforeinstallprompt", handler);
  //     return () => {
  //       window.removeEventListener("beforeinstallprompt", handler);
  //     }
  //   };
  // },[setPromptEvent, promptEvent]);

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

  if (!isVisible) {
    return <div />;
  }


  return (
    <>
      {/* {promptEvent && (
        <button style={{position:'fixed', bottom:'20px', right:'20px', backgroundColor:'#007bff', color:'#fff', border:'none', padding:'10px 20px', fontSize:'16px', cursor:'pointer', zIndex:'999'}} onClick={handleClick}>Add to Home Screen</button>
      )} */}

      <div onClick={hide}>
        <button style={{position:'fixed', bottom:'20px', right:'20px', backgroundColor:'#007bff', color:'#fff', border:'none', padding:'10px 20px', fontSize:'16px', cursor:'pointer', zIndex:'999'}} onClick={promptToInstall}>Add to homescreen</button>
      </div>

      {/* Header */}
      <Header />

      {/* Content */}
      <Outlet />

      {/* Footer */}
      <Footer />
    </>
  )
}
