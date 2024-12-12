import React from 'react';
import './Modal.css';  // You can style this modal as per your design preferences

const Modal = ({ isOpen, onClose, cardData }) => {
    if (!isOpen) return null;  // Don't render the modal if it's closed

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <button onClick={onClose} className="close-btn">X</button>
                <h3>{cardData.title}</h3>
                <p><strong>Description:</strong> {cardData.description}</p>
                <p><strong>Due Date:</strong> {cardData.dueDate}</p>
                <div>
                    <strong>Checklist:</strong>
                    <ul>
                        {cardData.checklist && cardData.checklist.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Modal;