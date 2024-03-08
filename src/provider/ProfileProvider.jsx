import { useReducer } from 'react';
import { ProfileContext } from '../context';
import { initialValue, profileReducer } from '../reducers/ProfileReducer';

export default function ProfileProvider({ children }) {
    const [state, dispatch] = useReducer(profileReducer, initialValue);
    return (
        <ProfileContext.Provider value={{ state, dispatch }}>
            {children}
        </ProfileContext.Provider>
    );
}
