import React, { useState, useEffect } from 'react';

const TypingAnimation = () => {
    const [text, setText] = useState('');
    const [showCursor, setShowCursor] = useState(true);
    const [remind, setremind] = useState(false);
    const fullText = 'Welcome to my website!'; // The full text you want to animate
    const [index, setindex] = useState(0);

    
    useEffect(() => {
        setremind((remind && text?.length === 0) ? true :
            (!remind && index < text?.length - 1) ? false :
            (text?.length === fullText?.length) ? true : false)
        return () => {
            
        };
    }, [index, remind, text?.length]);

    useEffect(() => {
      
     const interval =   setInterval(() => {
            
        }, 4000);
    const typingTimer = setTimeout(() => {
    //   if (!remind) {
        if (index < fullText?.length) {
        setText((prevText) => prevText + fullText[index]);
        setindex(prev=>prev+1)
        }
        // }
        // if (remind) {
        //     setText((prevText) => prevText?.slice(0, index));
        // setindex(prev=>prev-1)
        // }
    }, 500); // Adjust the typing speed by modifying the delay (in milliseconds)
    
        return () => {
            clearTimeout(typingTimer)
            clearInterval()
        };
  }, [text, fullText, index, remind]);

    useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor((prevShowCursor) => !prevShowCursor);
    }, 500); // Adjust the blinking speed of the cursor (in milliseconds)

    return () => clearInterval(cursorTimer);
  }, []);
    return <div>{text}
    {showCursor && <span>|</span>}</div>;
};

export default TypingAnimation;
