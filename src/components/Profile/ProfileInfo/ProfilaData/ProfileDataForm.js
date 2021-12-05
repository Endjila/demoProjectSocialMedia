import React from 'react';
import { reduxForm } from 'redux-form';
import { createField, Input, Textarea } from '../../../common/FormsControls/FormsControls';
import style from '../../../common/FormsControls/FormsControls.module.css';
import styles from './ProfileDataForm.module.css';
import Button from '../../../common/Button/Button'

const ProfileDataForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={styles.profileData}>
            <ul className={styles.pointAboutInfo}>
                <li>
                    <h2 className={styles.name}>Full Name</h2>: 
                    <div className={styles.nameField}>{createField(Input, "Full Name", "fullName", [])}</div>
                </li>
                <div>
                    <li className={styles.aboutJob}>
                        <b>Looking for a job</b>:
                        <div className={styles.aboutJobField}>{createField(Input, null, "lookingForAJob", [], { type: "checkbox" })}</div>
                    </li>
                    <li className={styles.aboutJob}>
                        <b>My professional skills</b>:
                        <div className={styles.myProfSkillsField}>{createField(Textarea, "My professional skills", "lookingForAJobDescription", [])}</div>
                    </li>
                </div>
                <li className={styles.aboutMe}>
                    <h2>About Me</h2>: {createField(Textarea, "About Me", "aboutMe", [])}
                </li>
                <li className={styles.contacts}>
                    <b>Contacts</b>: {Object.keys(props.profile.contacts)
                        .map(key => {
                            return <div key={key}>
                                <b className={styles.contact}>{key}</b>: 
                                <div className={styles.contactField}>{createField(Input, key, "contacts." + key, [])}</div>
                            </div>
                        })}
                </li>
            </ul>
            {!!props.error && <div className={style.formSummaryError}>
                {props.error}
            </div>}
            <div>
                <button className={styles.buttonSave}><Button buttonName={"Save"}/></button>
            </div>
        </form>
    )
}

const ProfileDataFormReduxForm = reduxForm({ form: 'editProfile' })(ProfileDataForm);

export default ProfileDataFormReduxForm;