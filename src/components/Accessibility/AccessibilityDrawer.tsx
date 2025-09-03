// components/AccessibilityDrawer.tsx
import React from 'react';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const AccessibilityDrawer: React.FC<Props> = ({ isOpen, onClose, children }) => {
    return (
        <>
            <div className={`accessibility-drawer ${isOpen ? 'open' : ''}`}>
                <div className='close-button'>
                    <button onClick={onClose}>✕</button>
                </div>
                {children}
            </div>
        </>
    );
};

export default AccessibilityDrawer;
