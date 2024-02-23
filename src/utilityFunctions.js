

export const formatDateTime = (timestamp) => {
    if (!timestamp) {
        return ''; // Handle null or undefined timestamp
    }
    const date = new Date(timestamp * 1000);
    const hours = date.getHours() % 12 || 12;
    const minutes = date.getMinutes();
    const period = date.getHours() < 12 ? 'a.m.' : 'p.m.';
    const monthAbbreviation = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);
    const day = String(date.getDate()).padStart(2, '0');

    return `${hours}.${minutes}${period},${monthAbbreviation}${day}`;
};

export const formatTime = (timestamp) => {
    if (!timestamp) {
        return ''; // Handle null or undefined timestamp
    }
    const date = new Date(timestamp * 1000);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes}`;
};
