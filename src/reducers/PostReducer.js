import { actions } from '../actions';

export const initialState = {
    loading: false,
    error: '',
    posts: [],
};
export function postReducer(state, action) {
    switch (action.type) {
        case actions.post.DATA_FETCHING: {
            return {
                ...state,
                loading: true,
            };
        }
        case actions.post.DATA_FETCHED: {
            return {
                ...state,
                loading: false,
                posts: action.data,
            };
        }
        case actions.post.DATA_ERROR: {
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        }
        case actions.post.POST_CREATED: {
            return {
                ...state,
                loading: false,
                posts: [...state.posts, action.data],
            };
        }

        default: {
            return state;
        }
    }
}
