import React, { useState } from "react";
import styles from "./EventCard.module.css"

function EventCard({ title, description, image }) {

    return(
        <div className={styles.card}>
            <img className={styles["card-image"]} src={image} alt="event picture" />
            <h2 className={styles["card-title"]}>{title}</h2>
            <p className={styles["card-text"]}>{description}</p>
        </div>
    );
}

export default EventCard