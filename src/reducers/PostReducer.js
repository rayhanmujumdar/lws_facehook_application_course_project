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
        case actions.post.POST_DELETED: {
            return {
                ...state,
                loading: false,
                posts: state?.posts?.filter(post => post.id !== action.postId),
            };
        }
        case actions.post.POST_EDITED: {
            return {
                ...state,
                loading: false,
                posts: state?.posts?.map(post => {
                    if (post.id === action.postId) {
                        return action.data;
                    } else {
                        return post;
                    }
                }),
            };
        }

        default: {
            return state;
        }
    }
}
