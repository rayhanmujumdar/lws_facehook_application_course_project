import { AuthContext } from '../context';
import useLocalStore from '../hooks/useAuthStorage';

export default function AuthProvider({ children }) {
    const [auth, setAuth] = useLocalStore('auth', {});
    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
}
