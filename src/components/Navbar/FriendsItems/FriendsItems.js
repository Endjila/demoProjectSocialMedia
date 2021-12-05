import React from 'react';
import {NavLink} from 'react-router-dom';
import classes from './FriendsItems.module.css';
import FriendItem from "./FriendItem/FriendItem";

const FriendsItems = (props) => {

    let friendsItems = props.dialogs.map(u => <FriendItem id={u.id} img={u.img}/>)

    return (
        <div>
            <div className={classes.friendsText}>
                Friends
            </div>
            <div className={classes.friendsAvas}>
                {friendsItems.slice(0, 3)}
            </div>
        </div>
    )
}

export default FriendsItems;