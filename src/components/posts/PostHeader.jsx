import { useState } from 'react';
import { Link } from 'react-router-dom';
import { actions } from '../../actions/index';
import ThreeDotIcons from '../../assets/icons/3dots.svg';
import DeleteIcons from '../../assets/icons/delete.svg';
import EditIcons from '../../assets/icons/edit.svg';
import TimeIcon from '../../assets/icons/time.svg';
import { useAuth } from '../../hooks/useAuth';
import useAvatar from '../../hooks/useAvatar';
import { useAxios } from '../../hooks/useAxios';
import { usePosts } from '../../hooks/usePosts';
import { getTimeDifferentFromNow } from '../../utils/getTimeDifferentFromNow';

export default function PostHeader({ post }) {
    const avatarUrl = useAvatar(post.author);
    const { auth } = useAuth();
    const isMe = auth?.user?.id === post?.author?.id;
    const [threeDotToggle, setThreeDotToggle] = useState(false);
    const { state, dispatch } = usePosts();
    const { api } = useAxios();
    const handleDeletePost = async postId => {
        try {
            if (confirm('Are Your Delete This Post')) {
                const response = await api.delete(`/posts/${postId}`);
                if (response.status === 200) {
                    dispatch({
                        type: actions.post.POST_DELETED,
                        postId,
                    });
                }
            }
        } catch (err) {
            dispatch({
                type: actions.post.DATA_ERROR,
                error: err.message,
            });
        }
    };
    return (
        <header className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
                <img
                    className="max-w-10 max-h-10 rounded-full lg:max-h-[58px] lg:max-w-[58px]"
                    src={avatarUrl}
                    alt="avatar"
                />
                <div>
                    <h6 className="text-lg lg:text-xl">{post?.author?.name}</h6>
                    <div className="flex items-center gap-1.5">
                        <img src={TimeIcon} alt="time" />
                        <span className="text-sm text-gray-400 lg:text-base">
                            {getTimeDifferentFromNow(post?.createAt)} ago
                        </span>
                    </div>
                </div>
            </div>
            {isMe && (
                <div className="relative">
                    <button onClick={() => setThreeDotToggle(!threeDotToggle)}>
                        <img src={ThreeDotIcons} alt="3dots of Action" />
                    </button>
                    {threeDotToggle && (
                        <div className="action-modal-container">
                            <Link
                                to={`/edit/${post?.id}`}
                                className="action-menu-item hover:text-lwsGreen"
                            >
                                <img src={EditIcons} alt="Edit" />
                                Edit
                            </Link>
                            <button
                                onClick={() => handleDeletePost(post?.id)}
                                className="action-menu-item hover:text-red-500"
                            >
                                <img src={DeleteIcons} alt="Delete" />
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            )}
        </header>
    );
}
