import { useReducer } from 'react';
import { PostContext } from '../context';
import { initialState, postReducer } from '../reducers/PostReducer';

export default function PostProvider({ children }) {
    const [state, dispatch] = useReducer(postReducer, initialState);
    return (
        <PostContext.Provider value={{ state, dispatch }}>
            {children}
        </PostContext.Provider>
    );
}
