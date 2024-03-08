import { actions } from '../actions';

export const initialValue = {
    loading: false,
    error: false,
    user: null,
    posts: [],
};

export const profileReducer = function (state, action) {
    switch (action.type) {
        case actions.profile.DATA_USER_FETCHING:
            return {
                ...state,
                loading: true,
            };
        case actions.profile.DATA_USER_FETCHED:
            return {
                ...state,
                loading: false,
                user: action.data?.user,
                posts: action.data?.posts,
            };
        case actions.profile.DATA_USER_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        case actions.profile.USER_DATA_EDITED:
            return {
                ...state,
                loading: false,
                user: action.data,
            };
        case actions.profile.IMAGE_UPLOADED:
            return {
                ...state,
                loading: false,
                user: {
                    ...state.user,
                    avatar: action.data
                },
            };
        default:
            return state;
    }
};
