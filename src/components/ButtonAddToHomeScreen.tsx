import React from "react";

const AddToHomeScreenButton= ({promptEvent}:any) => {
  const handleClick = () => {
    if(promptEvent){
      promptEvent.prompt();
    }
  };

  return (
    <button style={{position:'fixed', bottom:'20px', right:'20px', backgroundColor:'#007bff', color:'#fff', border:'none', padding:'10px 20px', fontSize:'16px', cursor:'pointer', zIndex:'999'}} onClick={handleClick}>
      Add to Home Screen
    </button>
  );
};

export default AddToHomeScreenButton;
