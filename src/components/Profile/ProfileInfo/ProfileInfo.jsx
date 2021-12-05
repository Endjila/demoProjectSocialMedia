import React, { useRef, useState } from 'react';
import styles from './ProfileInfo.module.css';
import Preloader from '../../common/Preloader/Preloader';
import ProfileStatusWithHooks from './ProfileStatus/ProfileStatusWithHooks';
import userPhoto from '../../../assets/images/user.png';
import ProfileData from './ProfilaData/ProfileData';
import ProfileDataForm from './ProfilaData/ProfileDataForm';
import cover from '../../../assets/images/cover.jpg'
import ButtonEditMode from './ButtonEditMode/ButtonEditMode';

const ProfileInfo = (props) => {
    const [editMode, setEditMode] = useState(false);
    const activateEditMode = () => {
        setEditMode(true);
    }

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0]);
        }
    }

    const onSubmit = (formData) => {
        props.saveProfile(formData)
            .then(() => {
                setEditMode(false);
            })
    }

    if (!props.profile) {
        return <Preloader />
    }

    return (
        <div>
            <div className={styles.descriptionBlock}>
                <div className={styles.coverPos}>
                    <img src={cover} alt="profile-bg" className={styles.cover} />
                </div>
                <div className={styles.personInfo}>
                    <div>
                        <img src={props.profile.photos.large || userPhoto} className={styles.userPhoto} />
                    </div>
                    <div>
                        <h3 className={styles.profileName}>{props.profile.fullName}</h3>
                    </div>
                    <div className={styles.profileStatus}>
                        <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus} />
                    </div>
                </div>
                <ul className={styles.editButtons}>
                    <li className={styles.buttonLi}>
                        {!!props.isOwner
                            && <div>
                                <input id={"Ava"} type={"file"} onChange={onMainPhotoSelected}
                                    className={styles.editModeHide} />
                                <label for={"Ava"}> <ButtonEditMode className={styles.editMode}
                                    buttonName={"Set Avatar"} /> </label>
                            </div>}
                    </li>
                    <li className={styles.buttonLi}>
                        {props.isOwner
                            && <ButtonEditMode method={activateEditMode} className={styles.editMode}
                                buttonName={"Edit Profile"} />}
                    </li>
                </ul>
                <div className={styles.data}>
        {editMode
            ? <ProfileDataForm initialValues={props.profile} profile={props.profile} onSubmit={onSubmit} />
            : <ProfileData profile={props.profile} isOwner={props.isOwner} />}
    </div>
            </div>
            
        </div>
        
    );
};

export default ProfileInfo;