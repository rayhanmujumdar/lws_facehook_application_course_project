import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useAxios } from '../../hooks/useAxios';
import useProfile from '../../hooks/useProfile';
import { useSort } from '../../hooks/useSort';
import Comment from '../common/Comment';
import PostCommentLists from './PostCommentLists';
export default function PostComments({ post }) {
    const { auth } = useAuth();
    const { state } = useProfile();
    const user = auth?.user ?? state?.user;
    const [showAllComment, setShowAllComment] = useState(false);
    const sortedComments = useSort({
        sortKey: 'createdAt',
        sortBy: 'desc',
        data: post?.comments,
        sortType: 'date',
    });
    const [comments, setComments] = useState(sortedComments);
    const [comment, setComment] = useState('');
    const { api } = useAxios();
    const handleComment = async event => {
        try {
            const keyCode = event.keyCode;
            if (keyCode === 13) {
                const response = await api.patch(`/posts/${post?.id}/comment`, {
                    comment,
                });
                console.log(response.status);
                if (response.status === 200) {
                    setComments([...response.data.comments]);
                    setComment('');
                }
            }
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div>
            <div className="flex-center mb-3 gap-2 lg:gap-4">
                <img
                    className="max-w-7 max-h-7 rounded-full lg:max-h-[34px] lg:max-w-[34px]"
                    src={`${import.meta.env.VITE_BASE_URL}/${user?.avatar}`}
                    alt="avatar"
                />

                <div className="flex-1">
                    <input
                        type="text"
                        className="h-8 w-full rounded-full bg-lighterDark px-4 text-xs focus:outline-none sm:h-[38px]"
                        name="post"
                        id="post"
                        placeholder="What's on your mind?"
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                        onKeyDown={handleComment}
                    />
                </div>
            </div>

            {comments?.length > 0 && (
                <>
                    {comments.length > 1 && (
                        <div className="mt-4">
                            <button
                                onClick={() => setShowAllComment(prev => !prev)}
                                className="text-gray-300 max-md:text-sm"
                            >
                                All Comment ▾
                            </button>
                        </div>
                    )}
                    {!showAllComment ? (
                        <Comment comment={comments[0]} />
                    ) : (
                        <PostCommentLists comments={comments} />
                    )}
                </>
            )}
        </div>
    );
}
