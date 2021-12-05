import React, { useState } from 'react';
import styles from './Header.module.css';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import personIcon from '../../assets/images/person.png';
import Button from '../common/Button/Button'

const Header = (props) => {
    return (
        <header className={styles.header}>
            <div className={styles.logoAndSpan}>
                <div>
                    <img src={logo} className={styles.logo} />
                </div>
                <div>
                    <span>Angel socm</span>
                </div>
            </div>
            <div className={styles.loginBlock}>
                {props.isAuth
                    ? <div>
                        <ul>
                            <li className={styles.personIcon}><img src={personIcon} /></li>
                            <li><h6 className={styles.loginName}>{props.login}&#160;&#160;&#160;</h6></li>
                            <li><Button onClickMethod={props.logoutTC} buttonName={"Logout"} /></li>
                        </ul>
                    </div>
                    : <NavLink to={'/login'} className={styles.login}>
                        <Button buttonName={"Login"}/>
                    </NavLink>
                }
            </div>
        </header>
    );
};

export default Header;