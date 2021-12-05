import React from "react";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import styles from "./Users.module.css"

let Users = (props) => {
    return (
        <div>
            <Paginator currentPage={props.currentPage} totalUsersCount={props.totalUsersCount}
                pageSize={props.pageSize} onPageChanged={props.onPageChanged} />
            <div>
                {props.users.map(u => <ul className={styles.users}><User key={u.id} user={u}
                    isFollowingInProgress={props.isFollowingInProgress}
                    unfollowUsersThunkCreator={props.unfollowUsersThunkCreator}
                    followUsersThunkCreator={props.followUsersThunkCreator} /></ul>)}
            </div>
        </div>
    )
}

export default Users;