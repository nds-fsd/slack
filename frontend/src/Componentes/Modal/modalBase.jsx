
import React, { useEffect, useRef } from "react";
import styles from './modalBase.module.css'

const ModalBase = ( {children, onClose, open }) => {
    const modalReference = useRef(null);

    useEffect(() => {

        const handleClickOutside = (e) => {
            if (modalReference.current && !modalReference.current.contains(e.target) && open) {
                onClose();
            }
        };

        document.addEventListener('click', handleClickOutside, true);

        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, [modalReference, open]);

    return (
        <div className={`${styles.backdrop} ${open && styles.open}`}>
          <div
          className={`${styles.modal} ${open && styles.open}`}
          ref={modalReference}
        >
          {children}
        </div>
      </div>

    )
}

export default ModalBase