import { useState } from 'react';
import { actions } from '../../actions';
import checkIcon from '../../assets/icons/check.svg';
import editIcons from '../../assets/icons/edit.svg';
import { useAxios } from '../../hooks/useAxios';
import useProfile from '../../hooks/useProfile';

export default function ProfileBio() {
    const [editMode, setEditMode] = useState(false);
    const { state, dispatch } = useProfile();
    const [bio, setBio] = useState(state?.user?.bio);
    const { api } = useAxios();
    const handleUpdateBio = async () => {
        try {
            dispatch({ type: actions.profile.DATA_USER_FETCHING });
            const response = await api.patch(`/profile/${state?.user?.id}`, {
                bio,
            });
            if (response.status === 200) {
                dispatch({
                    type: actions.profile.USER_DATA_EDITED,
                    data: response.data,
                });
            }
            setEditMode(false);
        } catch (err) {
            dispatch({
                type: actions.profile.DATA_USER_ERROR,
                error: err.message,
            });
        }
    };
    return (
        <div className="mt-4 flex items-start gap-2 lg:mt-6">
            <div className="flex-1">
                {!editMode ? (
                    <p className="leading-[188%] text-gray-400 lg:text-lg">
                        {bio}
                    </p>
                ) : (
                    <textarea
                        value={bio}
                        rows={4}
                        cols={64}
                        className="text-black outline-none p-2 rounded-md"
                        onChange={e => setBio(e.target.value)}
                    />
                )}
            </div>
            {!editMode ? (
                <button
                    onClick={() => setEditMode(true)}
                    className="flex-center h-7 w-7 rounded-full"
                >
                    <img src={editIcons} alt="Edit" />
                </button>
            ) : (
                <button
                    onClick={handleUpdateBio}
                    className="flex-center h-7 w-7 rounded-full"
                >
                    <img src={checkIcon} alt="Edit" />
                </button>
            )}
        </div>
    );
}
