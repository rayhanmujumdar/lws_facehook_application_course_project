export const useSort = ({ sortKey, sortBy, data = [], sortType = 'date' }) => {
    function sortLogic(obj1, obj2) {
        if (sortType === 'date') {
            return (
                new Date(obj1[sortKey]).getTime() -
                new Date(obj2[sortKey]).getTime()
            );
        } else if (sortType === 'string') {
            return obj1[sortKey].localeCompare(obj2[sortKey]);
        } else if (sortType === 'number') {
            return obj1[sortKey] - obj2[sortKey];
        }
    }
    const sortedData = data.slice().sort((a, b) => {
        if (sortBy === 'desc') {
            return sortLogic(b, a);
        } else {
            return sortLogic(a, b);
        }
    });
    return sortedData;
};
