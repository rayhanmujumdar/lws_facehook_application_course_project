import { Link } from 'react-router-dom';
import RegistrationIcon from '../assets/icons/registration.svg';
import RegisterForm from '../components/auth/RegisterForm';
export default function Register() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-deepDark py-8">
            <div className="max-w-[1368px] flex-1">
                <div className="container grid items-center gap-8 lg:grid-cols-2">
                    <div>
                        <img
                            className="mb-12 h-60"
                            src={RegistrationIcon}
                            alt="auth_illustration"
                        />
                        <div>
                            <h1 className="mb-3 text-4xl font-bold lg:text-[40px]">
                                Facehook
                            </h1>
                            <p className="max-w-[452px] text-gray-400/95 lg:text-lg">
                                Create a social media app with features like,
                                showing the post, post details, reactions,
                                comments and profile.
                            </p>
                        </div>
                    </div>
                    <div className="card">
                        <RegisterForm />
                        <div className="py-4 lg:py-4">
                            <p className="text-center text-xs text-gray-600/95 lg:text-sm">
                                Already have an account?
                                <Link
                                    className="hover:text-lwsGreen text-white transition-all hover:underline"
                                    to="/login"
                                >
                                    Login
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
