import React from "react";
import styles from "./Users.module.css"
import userPhoto from './../../assets/images/user.png';
import { NavLink } from "react-router-dom";
import Button from '../common/Button/Button';

let User = (props) => {
    return (
        <div className={styles.userWrapper}>
            <li>
                <div>
                    <NavLink to={'/profile/' + props.user.id}>
                        <img className={styles.userPhoto}
                            src={props.user.photos.small != null ? props.user.photos.small : userPhoto} />
                    </NavLink>
                </div>
                <span>
                    <span>
                        <div>{props.user.name}</div>
                    </span>
                </span>
                <div>
                    {props.user.followed ?
                        <button className={styles.buttonFollowFlow} disabled={props.isFollowingInProgress.some(id => id === props.user.id)} onClick={() => {
                            props.unfollowUsersThunkCreator(props.user.id);
                        }}><Button buttonName={"Unfollow"} /></button> :

                        <button className={styles.buttonFollowFlow} disabled={props.isFollowingInProgress.some(id => id === props.user.id)} onClick={() => {
                            props.followUsersThunkCreator(props.user.id);
                        }}><Button buttonName={"Follow"} /></button>}
                </div>
            </li>
        </div>
    )
}

export default User;