import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import Register from './pages/Register';
import PrivateRoutes from './routes/PrivateRoutes';

function App() {
    return (
        <>
            <Routes>
                <Route element={<PrivateRoutes />}>
                    <Route path="/" element={<Home />} exact />
                    <Route path="/me" element={<Profile />} />
                </Route>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
}

export default App;
