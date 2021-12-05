import React from 'react';
import styles from './Button.module.css';

const Button = (props) => {
    return (
        <div className={styles.body}>
            <a className={styles.borderButton} onClick={props.onClickMethod}>{props.buttonName}</a>
        </div>
    )
}

export default Button;