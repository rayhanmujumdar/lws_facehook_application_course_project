import useProfile from '../../hooks/useProfile';
import { useSort } from '../../hooks/useSort';
import PostLists from '../posts/PostLists';
export default function MyPosts() {
    const { state } = useProfile();
    const posts = useSort({
        sortBy: 'desc',
        sortKey: 'createAt',
        data: state?.posts,
        sortType: 'date',
    });
    return (
        <>
            <h4 className="mt-6 text-xl lg:mt-8 lg:text-2xl">Your Posts</h4>
            <PostLists posts={posts} />
        </>
    );
}
