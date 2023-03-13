import React, { useState, useRef, useEffect } from 'react';
// import ReactDOM from 'react-dom';

const ChatbotModal = () => {
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setShowModal(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleModalClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setShowModal(false);
    }
  };

  const modalStyles = {
    position: 'fixed',
    top: '50px',
    left: '50px',
    right: '20px',
    bottom: '50px',
    width:'auto',
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    clipPath:'insets(0,0,0,0)'
    // opacity: showModal ? 1 : 0,
    // visibility: showModal ? 'visible' : 'hidden',
    // transition: 'opacity 0.1s ease-in-out, visibility 0.1s ease-in-out',
  };

  const modalContentStyles = {
    background: 'white',
    position:'absolute',
    padding: '1rem',
    cursor:'pointer',
    borderRadius: '5px',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)',
    height: '300px',
    bottom: showModal ? '0px' : '-100vh',
    opacity: showModal ? '1' : '0',
    transition: `bottom 2s ease-in-out, opacity 2s ease-in-out`,
    
  };

  return (
    <>
      <button onClick={toggleModal}>Open Chatbot</button>
        <div style={{...modalStyles, overflowY:'hidden',}} onClick={handleModalClick}>
          <div ref={modalRef} style={{...modalContentStyles}}>
            <h2>Chatbot</h2>
            <p>Start chatting with our bot!</p>
            <button onClick={toggleModal}>Close</button>
          </div>
        </div>
    </>
  );
};

// ReactDOM.render(<ChatbotModal />, document.getElementById('root'));
export default ChatbotModal
