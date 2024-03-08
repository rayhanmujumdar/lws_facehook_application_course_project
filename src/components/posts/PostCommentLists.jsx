import Comment from '../common/Comment';

export default function PostCommentLists({ comments }) {
    return (
        <div className="space-y-4 divide-y divide-lighterDark pl-2 lg:pl-3">
            {comments.map(comment => (
                <Comment key={comment.id} comment={comment} />
            ))}
        </div>
    );
}
