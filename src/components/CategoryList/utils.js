export const formatViews = (views) => {
    if (views >= 10000000) {
        return Math.floor(views / 10000000) + 'cr';
    } else if (views >= 1000000) {
        return Math.floor(views / 1000000) + 'M';
    } else if (views >= 100000) {
        return Math.floor(views / 100000) + 'L';
    } else if (views >= 1000) {
        return Math.floor(views / 1000) + 'k';
    } else {
        return views;
    }
};

export const formatDate = (date) => {
    const currentDate = new Date();
    const postDate = new Date(date);

    const yearsDifference = currentDate.getFullYear() - postDate.getFullYear();
    const monthsDifference = currentDate.getMonth() - postDate.getMonth();
    const daysDifference = currentDate.getDate() - postDate.getDate();

    // Calculate total months considering year difference
    const totalMonths = yearsDifference * 12 + monthsDifference;

    // Adjust month calculation if current date's day is less than post date's day
    const adjustedMonths = daysDifference < 0 ? totalMonths - 1 : totalMonths;

    const timeDifference = currentDate - postDate;
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) {
        return seconds + ' sec ago';
    } else if (minutes < 60) {
        return minutes + ' mins ago';
    } else if (hours < 24) {
        return hours + ' hours ago';
    } else if (days < 7) {
        return days + ' days ago';
    } else if (days < 30) {
        const weeks = Math.floor(days / 7);
        return weeks + ' weeks ago';
    } else if (adjustedMonths < 12) {
        return adjustedMonths + ' months ago';
    } else {
        return yearsDifference + ' years ago';
    }
};
