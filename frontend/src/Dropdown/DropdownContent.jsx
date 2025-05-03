import React from 'react';
import styles from './DropdownContent.module.css';

const DropdownContent = ({ children }) => {
    return <div className={styles["dropdown-content"]}>{children}</div>;
};

export default DropdownContent;