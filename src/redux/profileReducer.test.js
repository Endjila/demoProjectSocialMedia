import profileReducer, { addPost, deletePost } from "./profileReducer";


let action = addPost("Why u crying");
let state = {
    posts: [
        { id: 1, message: 'Hi, how are you?', likesCount: 0, },
        { id: 2, message: 'It\'s my first post.', likesCount: 23, },
    ],
};

test('new post should be added', () => {
    let newState = profileReducer(state, action);
    expect(newState.posts.length).toBe(3);
});

test('message should be correct', () => {
    let newState = profileReducer(state, action);
    expect(newState.posts[2].message).toBe("Why u crying");
});

test('delete post', () => {
    let action = deletePost(1);
    let newState = profileReducer(state, action);
    expect(newState.posts.length).toBe(1);
});