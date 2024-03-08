import useAvatar from '../../hooks/useAvatar';

export default function Comment({ comment }) {
    const avatarUrl = useAvatar(comment?.author);
    return (
        <div key={comment.id} className="flex items-center gap-3 pt-4">
            <img
                className="max-w-6 max-h-6 rounded-full"
                src={avatarUrl}
                alt="avatar"
            />
            <div>
                <div className="flex gap-1 text-xs lg:text-sm">
                    <span>{comment?.author?.name}: </span>
                    <span>{comment?.comment}</span>
                </div>
            </div>
        </div>
    );
}
