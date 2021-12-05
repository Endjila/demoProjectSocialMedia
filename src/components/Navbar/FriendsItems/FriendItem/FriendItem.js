import React from 'react';
import {NavLink} from 'react-router-dom';
import classes from './../FriendsItems.module.css';

const FriendItem = (props) => {
    return (
            <div className={classes.friendAva}>
                <NavLink to={"/dialogs/" + props.id}>
                    <img src={props.img}/>
                </NavLink>
            </div>
    )
}

export default FriendItem;