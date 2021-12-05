import { stopSubmit } from "redux-form";
import { profileApi } from "./../api/api"

const ADD_POST = 'myProject/profile/ADD-POST';
const SET_USER_PROFILE = 'myProject/profile/SET_USER_PROFILE';
const TOGGLE_IS_FETCHING = 'myProject/profile/TOGGLE_IS_FETCHING';
const SET_STATUS = 'myProject/profile/SET_STATUS';
const SET_PHOTO_SUCCESS = 'myProject/profile/SET_PHOTO_SUCCESS';
const DELETE_POST = 'myProject/profile/DELETE_POST';

let initialState = {
    posts: [
        { id: 1, message: 'Hi, how are you?', likesCount: 0, },
        { id: 2, message: 'It\'s my second post.', likesCount: 23, },
    ],
    profile: null,
    isFetching: true,
    status: "",
};

const profileReducer = (state = initialState, action) => {
    let stateCopy;
    switch (action.type) {
        case ADD_POST:
            return (
                stateCopy = {
                    ...state,
                    posts: [...state.posts, { id: 5, message: action.postNewText, likesCount: 0, },],
                    newPostText: '',
                }
            );
        case SET_USER_PROFILE:
            return { ...state, profile: action.profile, }
        case TOGGLE_IS_FETCHING:
            return { ...state, isFetching: action.isFetching, }
        case SET_STATUS:
            return { ...state, status: action.status, }
        case SET_PHOTO_SUCCESS:
            return { ...state, profile: { ...state.profile, photos: action.photos }, }
        case DELETE_POST:
            return { ...state, posts: state.posts.filter(p => p.id != action.postId), }
        default:
            return state;
    }
}

export const addPost = (postNewText) => ({ type: ADD_POST, postNewText });
const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile });
const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching });
const setUserStatus = (status) => ({ type: SET_STATUS, status });
const setPhotoSuccess = (photos) => ({ type: SET_PHOTO_SUCCESS, photos });
const deletePost = (postId) => ({ type: DELETE_POST, postId });

export const getProfileThunkCreator = (userId) => {
    return async dispatch => {
        dispatch(toggleIsFetching(true));
        let response = await profileApi.setProfile(userId);
        dispatch(toggleIsFetching(false));
        dispatch(setUserProfile(response.data));
    }
}

export const getStatusThunkCreator = (userId) => {
    return async dispatch => {
        let response = await profileApi.getStatus(userId);
        dispatch(setUserStatus(response.data));
    }
}

export const updateStatusThunkCreator = (status) => {
    return async dispatch => {
        try {
            let response = await profileApi.updateStatus(status)
            if (response.data.resultCode === 0) {
                dispatch(setUserStatus(status));
            }
        } catch(error) {
            alert("Some error occured");
        }
    }
}

export const savePhoto = (file) => {
    return async dispatch => {
        let response = await profileApi.savePhoto(file)
        if (response.data.resultCode === 0) {
            dispatch(setPhotoSuccess(response.data.data.photos));
        }
    }
}

export const saveProfile = (profile) => async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const response = await profileApi.saveProfile(profile)
    if (response.data.resultCode === 0) {
        dispatch(getProfileThunkCreator(userId));
    } else {
        let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";
        dispatch(stopSubmit("editProfile", { _error: message }))
        return Promise.reject(response.data.messages[0])
    }
}

export default profileReducer;