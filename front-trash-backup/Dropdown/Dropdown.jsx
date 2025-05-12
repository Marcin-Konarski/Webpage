import React, { useState } from 'react'
import DropdownButton from './DropdownButton'
import DropdownContent from './DropdownContent'
import styles from './Dropdown.module.css'

const Dropdown = ({ id, buttonText, content }) => {

    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen((i) => !i);
    };

    return (
        <div id={id} className={styles["dropdown"]}>
            <DropdownButton toggle={toggleDropdown} isOpen={isOpen}>
                {buttonText}
            </DropdownButton>
            {isOpen && <DropdownContent>{content}</DropdownContent>}
        </div>
    );
};

export default Dropdown