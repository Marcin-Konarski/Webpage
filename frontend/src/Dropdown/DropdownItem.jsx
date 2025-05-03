import styles from "./DropdownItem.module.css";

const DropdownItem = ({ children, onClick }) => {
  return (
    <div className={styles["dropdown-item"]} onClick={onClick}>
      {children}
    </div>
  );
};

export default DropdownItem;