import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api';
import { useAuth } from '../../hooks/useAuth';
import Field from '../common/Field';

export default function LoginForm() {
    const navigate = useNavigate();
    const { setAuth } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm();
    const onSubmit = async formData => {
        try {
            const user = {
                email: formData.email,
                password: formData.password,
            };
            const response = await api.post('/auth/login', user);
            if (response.status === 200) {
                const { user, token } = response.data || {};
                if (token) {
                    const { token: authToken, refreshToken } =
                        response.data.token;
                    setAuth({ user, authToken, refreshToken });
                    navigate('/');
                }
            }
        } catch (err) {
            console.error(err);
            setError('root.random', {
                type: 'random',
                message: 'User Id and password are invalid',
            });
        }
    };
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="border-b border-[#3F3F3F] pb-10 lg:pb-[60px]"
        >
            {/* email */}
            <Field label="Email" error={errors?.email?.message}>
                <input
                    {...register('email', {
                        required: 'Email Id Must be required',
                    })}
                    className={`auth-input ${
                        !!errors.email ? 'border-red-500' : 'border-gray-500'
                    }`}
                    name="email"
                    type="email"
                    id="email"
                />
            </Field>
            {/* password */}
            <Field label="Password" error={errors?.password?.message}>
                <input
                    {...register('password', {
                        required: 'Password must be required',
                        minLength: {
                            value: 8,
                            message: 'Password must be 8 characters',
                        },
                    })}
                    className={`auth-input ${
                        !!errors.password ? 'border-red-500' : 'border-gray-500'
                    }`}
                    name="password"
                    type="password"
                    id="password"
                />
            </Field>
            {/* Submit */}
            {
                <p role="alert" className="text-red-500 text-sm">
                    {errors?.root?.random?.message}
                </p>
            }
            <Field>
                <button
                    className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90"
                    type="submit"
                >
                    Login
                </button>
            </Field>
        </form>
    );
}
