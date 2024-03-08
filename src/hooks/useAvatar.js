import useProfile from './useProfile';

export default function useAvatar(author) {
    const { state } = useProfile();
    const isMe = author?.id === state?.user?.id;
    const avatar = isMe ? state?.user?.avatar : author?.avatar;
    const avatarUrl = `${import.meta.env.VITE_BASE_URL}/${avatar}`;
    return avatarUrl;
}
