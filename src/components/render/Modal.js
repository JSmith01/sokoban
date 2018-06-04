import React from 'react';

const Modal = ({ header, children, visible }) => !visible ? null : (
    <div className="modal" style={{ opacity: visible ? 1 : 0 }}>
        {header && <h1>{header}</h1>}
        {children}
    </div>
);

export default Modal;
