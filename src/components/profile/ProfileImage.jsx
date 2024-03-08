import { useRef } from 'react';
import { actions } from '../../actions';
import editIcon from '../../assets/icons/edit.svg';
import { useAxios } from '../../hooks/useAxios';
import useProfile from '../../hooks/useProfile';
export default function ProfileImage() {
    const { state, dispatch } = useProfile();
    const inputRef = useRef();
    const { api } = useAxios();
    const handleImageUpload = e => {
        e.preventDefault();
        inputRef.current.click();
        inputRef.current.addEventListener('change', uploadImage);
    };
    const uploadImage = async () => {
        try {
            const formData = new FormData();
            const files = inputRef.current.files;
            for (const file of files) {
                formData.append('avatar', file);
            }
            const response = await api.post(
                `/profile/${state?.user?.id}/avatar`,
                formData
            );
            if (response.status === 200) {
                dispatch({
                    type: actions.profile.IMAGE_UPLOADED,
                    data: response.data.avatar,
                });
            }
        } catch (err) {
            dispatch({
                type: actions.profile.DATA_USER_ERROR,
                error: err.message,
            });
        }
    };
    return (
        <div className="relative mb-8 max-h-[180px] max-w-[180px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]">
            <img
                className="max-w-full rounded-full w-44"
                src={`${import.meta.env.VITE_BASE_URL}/${state?.user?.avatar}`}
                alt={state?.user?.firstName}
            />
            <form onSubmit={handleImageUpload}>
                <input type="file" ref={inputRef} hidden />
                <button className="flex-center absolute bottom-4 right-4 h-7 w-7 rounded-full bg-black/50 hover:bg-black/80">
                    <img src={editIcon} alt="Edit" />
                </button>
            </form>
        </div>
    );
}
