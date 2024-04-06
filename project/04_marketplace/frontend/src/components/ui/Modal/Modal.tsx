import React from "react";

import "./modal.css";

const Modal = ({ setShowModal, setValue, onSubmit }: any) => {
    return (
        <div className="modal__wrapper">
            <div className="single__modal">
                <span className="close__modal">
                    <i
                        className="ri-close-line"
                        onClick={() => setShowModal(false)}
                    ></i>
                </span>
                <div className="input__item mb-4">
                    <input
                        onChange={(e) => setValue(e.target.value)}
                        type="text"
                        placeholder="Enter the price ..."
                    />
                </div>
                <button onClick={onSubmit} className="place__bid-btn">
                    Sell
                </button>
            </div>
        </div>
    );
};

export default Modal;
