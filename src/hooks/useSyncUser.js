import { useAuth } from './useAuth';
import useProfile from './useProfile';

export function useSyncUser() {
    const { state } = useProfile();
    const { auth } = useAuth();
    const user = state?.user ?? auth?.user;
    return user;
}
