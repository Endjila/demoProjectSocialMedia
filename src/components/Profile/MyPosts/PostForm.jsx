import React from 'react';
import { reduxForm } from 'redux-form';
import { createField, Textarea } from '../../common/FormsControls/FormsControls';
import styles from './MyPosts.module.css';
import Button from '../../common/Button/Button'

const PostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div className={styles.postForm}>
                {createField(Textarea, "Type your minds here...", "postNewText", [])}
            </div>
            <div>
                <button className={styles.buttonAddPost}><Button buttonName={"Add Post"}/></button>
            </div>
        </form>
    );
};

const PostReduxForm = reduxForm({ form: 'postSetting' })(PostForm)

export default PostReduxForm;