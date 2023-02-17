import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';

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
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: showModal ? 1 : 0,
    visibility: showModal ? 'visible' : 'hidden',
    transition: 'opacity 0.2s ease-in-out, visibility 0.2s ease-in-out',
  };

  const modalContentStyles = {
    background: 'white',
    padding: '1rem',
    borderRadius: '5px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
  };

  return (
    <>
      <button onClick={toggleModal}>Open Chatbot</button>
      {showModal && (
        <div style={modalStyles} onClick={handleModalClick}>
          <div ref={modalRef} style={modalContentStyles}>
            <h2>Chatbot</h2>
            <p>Start chatting with our bot!</p>
            <button onClick={toggleModal}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

ReactDOM.render(<ChatbotModal />, document.getElementById('root'));
