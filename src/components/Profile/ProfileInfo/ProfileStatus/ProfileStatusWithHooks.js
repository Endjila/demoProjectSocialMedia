import React, { useEffect, useState } from 'react';
import styles from './ProfileStatus.module.css'

const ProfileStatusWithHooks = (props) => {

    let [editMode, setEditMode] = useState(false);
    const activateEditMode = () => {
        setEditMode(true);
    }
    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    }

    let [status, setStatus] = useState(props.status);
    const onStatusChange = (e) => {
        setStatus(e.target.value)
    }

    useEffect( () => {
        setStatus(props.status);
    }, [props.status] );

    return (
        <div>
            {!editMode &&
                <div>
                    <span onDoubleClick={activateEditMode} >{props.status 
                    || <div className={styles.noStatus}>
                        *There is no status*
                        </div> }</span>
                </div>
            }
            {!!editMode &&
                <div>
                    <input autoFocus={true} onBlur={deactivateEditMode}
                    onChange={onStatusChange} value={status}
                    className={styles.inputStatus}/>
                </div>
            }
        </div>
    )
}


export default ProfileStatusWithHooks;