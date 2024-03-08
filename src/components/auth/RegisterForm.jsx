import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAxios } from '../../hooks/useAxios';
import Field from '../common/Field';

export default function RegisterForm() {
    const { api } = useAxios();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm();

    const onSubmit = async formData => {
        try {
            const confirmPassword = formData.confirmPassword;
            if (confirmPassword === formData.password) {
                const response = await api.post('/auth/register', formData);
                if (response.status === 201) {
                    navigate('/login');
                }
            } else {
                setError('root.random', {
                    type: 'random',
                    message: "Repeat password does't match",
                });
            }
        } catch (err) {
            setError('root.random', {
                type: 'random',
                message: `Something went wrong with ${err.message}`,
            });
        }
    };
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="border-b border-[#3F3F3F] pb-10 lg:pb-[30px]"
        >
            <Field label="First Name" error={errors?.firstName?.message}>
                <input
                    {...register('firstName', {
                        required: 'FirstName Must be required',
                    })}
                    className={`auth-input ${
                        !!errors.firstName
                            ? 'border-red-500'
                            : 'border-gray-500'
                    }`}
                    name="firstName"
                    type="text"
                    id="firstName"
                />
            </Field>
            <Field label="LastName" error={errors?.lastName?.message}>
                <input
                    {...register('lastName')}
                    className={`auth-input ${
                        !!errors.lastName ? 'border-red-500' : 'border-gray-500'
                    }`}
                    name="lastName"
                    type="text"
                    id="lastName"
                />
            </Field>
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
            <Field
                label="Confirm Password"
                error={errors?.confirmPassword?.message}
            >
                <input
                    {...register('confirmPassword', {
                        required: 'Confirm Password must be required',
                        minLength: {
                            value: 8,
                            message: 'Password must be 8 characters',
                        },
                    })}
                    className={`auth-input ${
                        !!errors.confirmPassword
                            ? 'border-red-500'
                            : 'border-gray-500'
                    }`}
                    name="confirmPassword"
                    type="password"
                    id="confirmPassword"
                />
            </Field>
            {
                <p role="alert" className="text-red-500 text-sm">
                    {errors?.root?.random?.message}
                </p>
            }
            <button
                className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90"
                type="submit"
            >
                Register
            </button>
        </form>
    );
}
