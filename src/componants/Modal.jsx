import React from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, children }) => {

  const closeModal = () => {
    onClose();
  };

  return (
    // Render the modal only when `isOpen` prop is true
    isOpen && (
      <div className="modal-overlay">
        <button className='btn' onClick={closeModal}><i className="fa-regular fa-rectangle-xmark"></i></button>
        {children}
      </div>
    )
  );
};

export default Modal;
