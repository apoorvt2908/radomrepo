import Image from 'next/image';
import React, { useEffect, useState } from 'react';

// Make sure to import CSSProperties for proper typing
import { CSSProperties } from 'react';

interface ModalProps {
    isOpen: boolean;
    isExpanded: boolean;
    onClose: () => void;
    setIsExpanded: (prev: boolean) => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, isExpanded, setIsExpanded }) => {
    // const [isExpanded, setIsExpanded] = useState<boolean>(true);

    const handelExpend = () => {
        setIsExpanded(!isExpanded)
    }
    useEffect(() => {
        if (!isExpanded) {
            document.body.classList.add('overflow-hidden')
        } else {
            document.body.classList.remove('overflow-hidden')
        }
    }, [isExpanded])

    if (!isOpen) return null;

    return (
        <div style={modalBackdropStyle} onClick={onClose}>
            <div className='d-flex justify-content-end' style={{ width: "94%" }}>
                <div className={`chatbot__container ${isExpanded ? "expanded" : ''}`} onClick={(e) => e.stopPropagation()}>
                    <div className='chatbot__container__actionbutton'>
                        <button className='expand__button' onClick={handelExpend}>
                            <Image src={`https://d2r32amryjykij.cloudfront.net/images/icon/${isExpanded ? 'expand' : 'collapse'}.webp`} alt={`${isExpanded ? 'expand' : 'collaps'}`} width={50} height={50} />
                        </button>
                        <button onClick={onClose} className='close__button'>
                            <Image src='https://d2r32amryjykij.cloudfront.net/images/icon/close-icon.webp' alt='close' width={50} height={50} />
                        </button>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
};

const modalBackdropStyle: CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1054,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};


export default Modal;