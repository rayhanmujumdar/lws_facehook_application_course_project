import { useEffect, useState } from 'react';
import { actions } from '../actions';
import NewPost from '../components/posts/NewPost.jsx';
import PostEntry from '../components/posts/PostEntry.jsx';
import PostLists from '../components/posts/PostLists.jsx';
import { useAxios } from '../hooks/useAxios';
import { usePosts } from '../hooks/usePosts.js';
import { useSort } from '../hooks/useSort.js';
export default function Home() {
    const [showPostEntry, setShowPostEntry] = useState(false);
    const { api } = useAxios();
    const { state, dispatch } = usePosts();
    const posts = useSort({
        sortKey: 'createAt',
        sortBy: 'desc',
        data: state?.posts,
        sortType: 'date',
    });
    useEffect(() => {
        const fetchPosts = async () => {
            dispatch({ type: actions.post.DATA_FETCHING });
            try {
                const response = await api.get('/posts');
                if (response?.status === 200) {
                    dispatch({
                        type: actions.post.DATA_FETCHED,
                        data: response?.data,
                    });
                }
            } catch (err) {
                console.error(err);
                dispatch({ type: actions.post.DATA_ERROR, error: err.message });
            }
        };
        fetchPosts();
    }, []);
    if (state?.loading) {
        return <div>Posts are Fetching ...</div>;
    }
    if (state?.error) {
        return <div>Something went wrong</div>;
    }
    return (
        <div>
            {showPostEntry ? (
                <PostEntry />
            ) : (
                <NewPost onEntryNewPost={setShowPostEntry} />
            )}
            <PostLists posts={posts} />
        </div>
    );
}
