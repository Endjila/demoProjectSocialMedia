import React from 'react';
import styles from './Post.module.css';
import ava from '../../../../assets/images/myAva.jpg'

const Post = (props) => {
    return (
        <div className={styles.item}>
            <img src={ava} />
            <div className={styles.messageText}>
                {props.message}
            </div>
            <div>
                {props.likesCount}
                <span> likes </span>
            </div>
        </div>
    );
};

export default Post;