import { useNavigate } from 'react-router-dom';
import logoutIcon from '../../assets/icons/logout.svg';
import { useAuth } from '../../hooks/useAuth';
export default function LogOut() {
    const navigate = useNavigate();
    const { setAuth } = useAuth();
    const handleLoggedOut = () => {
        navigate('/login');
        setAuth({});
    };
    return (
        <button onClick={handleLoggedOut} className="icon-btn">
            <img src={logoutIcon} alt="Logout" />
        </button>
    );
}
