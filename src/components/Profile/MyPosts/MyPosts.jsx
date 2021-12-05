import React from 'react';
import styles from './MyPosts.module.css';
import Post from './Post/Post';
import PostReduxForm from './PostForm';


const MyPosts = (props) => {
    const postElements = props.posts.map(p => <Post message={p.message} likesCount={p.likesCount} />)

    let addPost = (values) => {
        props.addPost(values.postNewText);
    }

    return (
        <div className={styles.postsBlock}>
            <h2>My posts</h2>
            <div>
                <PostReduxForm onSubmit={addPost} />
            </div>
            <div className={styles.posts}>
                {postElements}
            </div>
        </div>
    );
};

export default MyPosts;