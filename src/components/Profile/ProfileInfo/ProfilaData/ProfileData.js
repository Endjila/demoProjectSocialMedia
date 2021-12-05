import React from 'react';
import Contacts from './ProfileContacts/ProfileContacts';
import styles from './ProfileData.module.css';
import yes from '../../../../assets/images/yesMark.png'
import no from '../../../../assets/images/noMark.png'

const ProfileData = (props) => {
    return (
        <div className={styles.profileData}>
            <ul className={styles.pointAboutInfo}>
                <li className={styles.aboutJob}>
                    <b>Looking for a job</b>:&#160; {props.profile.lookingForAJob
                        ? <img src={yes} className={styles.yesMark} />
                        : <img src={no} className={styles.noMark} />}
                </li>
                {!!props.profile.lookingForAJob &&
                    <li className={styles.aboutJob}>
                        <b>My professional skills</b>: {props.profile.lookingForAJobDescription}
                    </li>}
                <li className={styles.aboutMe}>
                    <h2> About Me:</h2> <h3>{props.profile.aboutMe}</h3>
                </li>
                <li className={styles.contacts}>
                    <b>Contacts</b>: {Object.keys(props.profile.contacts)
                        .map(key => {
                            if (!!props.profile.contacts[key]) {
                                return <Contacts key={key} contactTitle={key} 
                                contactValue={props.profile.contacts[key]} />
                            }
                        })} 
                </li>
            </ul>
        </div>
    )
}

export default ProfileData;