import React from 'react';
import {NavLink} from 'react-router-dom';
import classes from './Navbar.module.css';
import FriendsItemsContainer from "./FriendsItems/FriendsItemsContainer";

const Navbar = (props) => {
    return (
        <nav className={classes.nav}>
            <div className={classes.item}>
                <NavLink className={classes.link} to="/profile">
                    Profile
                </NavLink>
            </div>
            <div className={classes.item}>
                <NavLink className={classes.link} to="/dialogs">
                    Messages
                </NavLink>
            </div>
            <div className={classes.item}>
                <NavLink className={classes.link} to="/users">
                    Users
                </NavLink>
            </div>
            {!!props.isAuth &&
            <div className={classes.separatedDownText}>
                <FriendsItemsContainer />
            </div>}
        </nav>
    );
};

export default Navbar;