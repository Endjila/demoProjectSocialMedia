import React from 'react';
import styles from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';

const Profile = (props) => {
    return (
        <div className={styles.profilePage}>
            <div className={styles.profileInfo}>
                <ProfileInfo 
                isOwner={props.isOwner} profile={props.profile}
                status={props.status} updateStatus={props.updateStatus}
                savePhoto={props.savePhoto} saveProfile={props.saveProfile} />
            </div>
            {!!props.isOwner &&
            <div className={styles.myPosts}>
                <MyPostsContainer />
            </div>}
        </div>
    );
};

export default Profile;