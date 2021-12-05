import React from 'react';
import styles from './ButtonEditMode.module.css';

const ButtonEditMode = (props) => {
    return (
        <div className={styles.body} onClick={props.method}>
            <a className={styles.borderButton}>{props.buttonName}</a>
        </div>
    )
}

export default ButtonEditMode;