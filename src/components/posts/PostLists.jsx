import Post from './Post';

export default function PostLists({ posts }) {
    return posts.map(post => <Post key={post.id} post={post} />);
}
