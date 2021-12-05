import React from 'react';
import styles from '../ProfileData.module.css';

const Contacts = (props) => { 
    return (
        <div className={styles.contact}>
            <b>{props.contactTitle}</b>: {props.contactValue}
        </div>
    )
}

export default Contacts;