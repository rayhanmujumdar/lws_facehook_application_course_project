import { useContext } from 'react';
import { PostContext } from '../context';

export const usePosts = () => {
    return useContext(PostContext);
};
