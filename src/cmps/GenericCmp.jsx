import React, { useState } from 'react';

export function GenericCmp({
    children,
    onClose,
    borderRadius = '32px',
    width = '848px',
    height = '511px',
    backgroundColor = 'white',
    position = 'fixed',
    top = '27.5rem',
    left = '50%',
    transform = 'translate(-50%, -50%)',
    boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)',
    right,
    bottom
}) {
    const [isClosing, setIsClosing] = useState(false);

    function handleClick(event) {
        event.stopPropagation(); // Prevent clicks inside the content from propagating
    }

    function handleClose() {
        setIsClosing(true);
        setTimeout(() => {
            onClose();
        }, 100);
    }

    const blockStyle = {
        borderRadius,
        width,
        height,
        backgroundColor,
        position,
        top,
        left,
        right,
        bottom,
        transform,
        boxShadow,
    };

    return (
        <>
            <div
                className={`backdrop-container ${isClosing ? 'closing' : ''}`}
                onClick={handleClose}
            >
            </div>
            <div className="block" style={blockStyle} onClick={handleClick}>
                {children}
            </div>
        </>
    );
}
