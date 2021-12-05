import { updateObjectInArray } from "../utils/objectsHelpers";
import { usersAPI } from "./../api/api"

const FOLLOW = 'myProject/user/FOLLOW';
const UNFOLLOW = 'myProject/user/UNFOLLOW';
const SET_USERS = 'myProject/user/SET_USERS';
const SET_CURRENT_PAGE = 'myProject/user/SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'myProject/user/SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'myProject/user/TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'myProject/user/TOGGLE_IS_FOLLOWING_PROGRESS';

let initialState = {
    users: [],
    pageSize: 20,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    isFollowingInProgress: [],
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return (
                {
                    ...state,
                    users: updateObjectInArray(state.users, action.userId, "id", { followed: true })
                }
            );
        case UNFOLLOW:
            return (
                {
                    ...state,
                    users: updateObjectInArray(state.users, action.userId, "id", { followed: false })
                }
            )
        case SET_USERS:
            return { ...state, users: action.users, }
        case SET_CURRENT_PAGE:
            return { ...state, currentPage: action.currentPage, }
        case SET_TOTAL_USERS_COUNT:
            return { ...state, totalUsersCount: action.totalUsersCount, }
        case TOGGLE_IS_FETCHING:
            return { ...state, isFetching: action.isFetching, }
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                isFollowingInProgress: action.isFetching
                    ? [...state.isFollowingInProgress, action.userId]
                    : state.isFollowingInProgress.filter(id => id != action.userId),
            }
        default:
            return state;
    }
}


export const follow = (userId) => ({ type: FOLLOW, userId });
export const unfollow = (userId) => ({ type: UNFOLLOW, userId });
export const setUsers = (users) => ({ type: SET_USERS, users });
export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage });
export const setUsersTotalCount = (totalUsersCount) => ({ type: SET_TOTAL_USERS_COUNT, totalUsersCount });
export const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching });
export const toggleFollowingProgress = (isFetching, userId) => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId });

export const getUsersThunkCreator = (currentPage, pageSize) => {
    return async dispatch => {
        dispatch(toggleIsFetching(true));
        let data = await usersAPI.getUsersRequest(currentPage, pageSize);
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setUsersTotalCount(data.totalCount));
    }
}

const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
    dispatch(toggleFollowingProgress(true, userId));
    let data = await apiMethod(userId);
    if (data.resultCode == 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(toggleFollowingProgress(false, userId));
}

export const followUsersThunkCreator = (userId) => {
    return async dispatch => {
        followUnfollowFlow(dispatch, userId, usersAPI.followUsers.bind(usersAPI), follow)
    }
}

export const unfollowUsersThunkCreator = (userId) => {
    return async dispatch => {
        followUnfollowFlow(dispatch, userId, usersAPI.unfollowUsers.bind(usersAPI), unfollow)
    }
}

export default usersReducer;