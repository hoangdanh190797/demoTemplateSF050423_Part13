import React from "react";

interface Props {
  promptEvent: any;
}

const AddToHomeScreenButton: React.FC<Props> = ({ promptEvent }) => {
  const handleClick = () => {
    promptEvent.prompt();
  };

  return (
    <button style={{position:'fixed', bottom:'20px', right:'20px', backgroundColor:'#007bff', color:'#fff', border:'none', padding:'10px 20px', fontSize:'16px', cursor:'pointer', zIndex:'999'}} onClick={handleClick}>
      Add to Home Screen
    </button>
  );
};

export default AddToHomeScreenButton;
