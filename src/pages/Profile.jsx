import { useEffect } from 'react';
import { actions } from '../actions';
import MyPosts from '../components/profile/MyPosts';
import ProfileInfo from '../components/profile/ProfileInfo';
import { useAuth } from '../hooks/useAuth';
import { useAxios } from '../hooks/useAxios';
import useProfile from '../hooks/useProfile';

export default function Profile() {
    const { state, dispatch } = useProfile();
    const { api } = useAxios();
    const { auth } = useAuth();
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                dispatch({ type: actions.profile.DATA_USER_FETCHING });
                const { data } = await api.get(`/profile/${auth?.user?.id}`);
                dispatch({
                    type: actions.profile.DATA_USER_FETCHED,
                    data: {
                        user: data?.user,
                        posts: data?.posts,
                    },
                });
            } catch (err) {
                dispatch({
                    type: actions.profile.DATA_USER_ERROR,
                    error: err.message,
                });
            }
        };
        fetchProfile();
    }, [auth.authToken]);
    if (state?.loading) return <p>Loading....</p>;
    return (
        <>
            <ProfileInfo />
            <MyPosts />
        </>
    );
}
