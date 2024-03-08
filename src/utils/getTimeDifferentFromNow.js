export const getTimeDifferentFromNow = fromDate => {
    let different = new Date().getTime() - new Date(fromDate).getTime();
    different = different / 1000;
    const hourDifference = Math.floor(different / 3600);
    different -= hourDifference * 3600;
    const minutesDifference = Math.floor(different / 60);
    different -= minutesDifference * 60;

    let message;
    if (hourDifference > 0) {
        if (hourDifference <= 24) {
            message = `${hourDifference} hour`;
        } else {
            message = `${Math.floor(hourDifference / 24)} days`;
        }
    }

    if (minutesDifference > 0 && hourDifference <= 0) {
        message = message
            ? `${message} ${minutesDifference} minutes`
            : `${minutesDifference} minutes`;
    }
    if (different && minutesDifference <= 0) {
        message = message
            ? `${message} ${Math.round(different)} seconds`
            : `${Math.round(different)} seconds`;
    }
    return message;
};
