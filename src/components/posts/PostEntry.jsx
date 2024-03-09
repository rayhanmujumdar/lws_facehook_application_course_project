import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { actions } from '../../actions';
import AddPhotoIcon from '../../assets/icons/addPhoto.svg';
import CloseIcon from '../../assets/icons/close.svg';
import { useAxios } from '../../hooks/useAxios';
import { usePosts } from '../../hooks/usePosts';
import { useSyncUser } from '../../hooks/useSyncUser';
import Field from '../common/Field';
export default function PostEntry() {
    const FormValue = new FormData();
    const navigate = useNavigate();
    const [beforeUploadImage, setBeforeUploadImage] = useState('');
    const [editPost, setEditPost] = useState({});
    const user = useSyncUser();
    const { api } = useAxios();
    const { state, dispatch } = usePosts();
    //TODO: Edit mode
    const { postId } = useParams();
    const location = useLocation();
    const editMode = location?.pathname === `/edit/${postId}`;
    useEffect(() => {
        const fetchSinglePost = async () => {
            if (editMode) {
                const response = await api.get(`/posts/${postId}`);
                if (response.status === 200) {
                    setEditPost(response.data);
                    setBeforeUploadImage(
                        `${import.meta.env.VITE_BASE_URL}/${
                            response.data?.image
                        }`
                    );
                }
            }
        };
        fetchSinglePost();
    }, [editMode]);
    // Form Handler
    const {
        handleSubmit,
        register,
        formState: { errors },
        setValue,
    } = useForm({
        values: {
            content: editMode ? editPost?.content : '',
        },
    });
    const handleAddEditPost = async formData => {
        FormValue.append('content', formData.content);
        if (formData?.image) {
            FormValue.append('image', formData.image);
        }
        dispatch({ type: actions.post.DATA_FETCHING });
        try {
            if (editMode) {
                console.log(FormValue.get('image'));
                const response = await api.patch(`/posts/${postId}`, FormValue);
                if (response?.status === 200) {
                    dispatch({
                        type: actions.post.POST_EDITED,
                        postId,
                        data: response.data,
                    });
                    navigate('/me');
                }
            } else {
                const response = await api.post('/posts', FormValue);
                if (response?.status === 200) {
                    dispatch({
                        type: actions.post.POST_CREATED,
                        data: response.data,
                    });
                }
            }
        } catch (err) {
            dispatch({
                type: actions.post.DATA_ERROR,
                error: err.message,
            });
        }
    };
    // upload image
    const handleImageUpload = async e => {
        const files = e.target.files;
        for (const file of files) {
            setValue('image', file);
            const imageUrl = URL.createObjectURL(file);
            setBeforeUploadImage(imageUrl);
        }
    };
    // cancel upload image
    const handleCancelUploadImage = () => {
        FormValue.delete('image');
        setBeforeUploadImage('');
    };
    return (
        <div className="card relative">
            <h6 className="mb-3 text-center text-lg font-bold lg:text-xl">
                {editMode ? 'Edit Post' : 'Create Post'}
            </h6>

            <form onSubmit={handleSubmit(handleAddEditPost)}>
                <div className="mb-3 flex items-center justify-between gap-2 lg:mb-6 lg:gap-4">
                    <div className="flex items-center gap-3">
                        <img
                            className="max-w-10 max-h-10 rounded-full lg:max-h-[58px] lg:max-w-[58px]"
                            src={`${import.meta.env.VITE_BASE_URL}/${
                                user?.avatar
                            }`}
                            alt="avatar"
                        />
                        <div>
                            <h6 className="text-lg lg:text-xl">Sumit Saha</h6>

                            <span className="text-sm text-gray-400 lg:text-base">
                                Public
                            </span>
                        </div>
                    </div>

                    <label
                        className="btn-primary cursor-pointer !text-gray-100"
                        htmlFor="photo"
                    >
                        <img src={AddPhotoIcon} alt="Add Photo" />
                        Add Photo
                    </label>
                    <input
                        onChange={handleImageUpload}
                        type="file"
                        name="photo"
                        id="photo"
                        className="hidden"
                    />
                </div>
                <Field error={errors?.content?.message}>
                    <textarea
                        {...register('content', {
                            required: 'Post Content must be required',
                        })}
                        name="content"
                        id="post"
                        placeholder="Share your thoughts..."
                        className="h-[120px] w-full bg-transparent focus:outline-none lg:h-[160px]"
                    />
                </Field>
                {beforeUploadImage && (
                    <div className="mx-auto mb-4 flex max-w-[90%] items-center justify-center lg:mb-6">
                        <div className="relative">
                            <img
                                className="max-w-full"
                                src={beforeUploadImage}
                                alt="image"
                            />
                            <button
                                onClick={handleCancelUploadImage}
                                className="absolute right-2 top-2 transition-all hover:opacity-80 active:scale-95 active:opacity-70"
                            >
                                <img src={CloseIcon} alt="close" />
                            </button>
                        </div>
                    </div>
                )}
                <div className="border-t border-[#3F3F3F] pt-4 lg:pt-6">
                    <button
                        className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90"
                        type="submit"
                    >
                        {editMode ? 'Edit' : 'Post'}
                    </button>
                </div>
            </form>
        </div>
    );
}
