import { authThunkCreator } from "./authReducer";

const INITIALIZED_SUCCESS = 'myProject/app/INITIALIZED_SUCCESS';

let initialState = {
    initialized: false,
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return { ...state, initialized: true, }
        default:
            return state;
    }
}

export const initializedSuccess = () => ({ type: INITIALIZED_SUCCESS });

export const initializeApp = () => (dispatch) => {
    dispatch(authThunkCreator())
    .then( () => {
        dispatch(initializedSuccess());
    })
}

export default appReducer;