import React from 'react';
import styles from "./DropdownButton.module.css";
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const DropdownButton = ({ children, isOpen, toggle }) => {
    return (
        <div onClick={toggle} className={`${styles["dropdown-button"]} ${isOpen ? styles["button-open"] : ""}`}>
            {children}
            <span className={styles["toggle-icon"]}>
                    {isOpen ? <FaChevronUp /> : <FaChevronDown />}
            </span>
        </div>
    );
};

export default DropdownButton;