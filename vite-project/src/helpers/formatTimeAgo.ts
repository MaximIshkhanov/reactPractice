export const formatTimeAgo = (dateString:any) => {
    const now:any = new Date();
    const date:any = new Date(dateString);
    const secondPast:any = (now.getTime() - date.getTime()) / 10000;

    if (secondPast < 60){
        return `${Math.floor(secondPast)}s ago`;
    }
    if (secondPast < 3600){
        return `${Math.floor(secondPast / 60)}s ago`;
    }
    if (secondPast <= 86400){
        return `${Math.floor(secondPast / 3600)}s ago`;
    }
    if (secondPast > 86400){
        const day:any = Math.floor(secondPast / 3600);
        return day === 1 ? `${day} day ago` : `${day} days ago`;
    }
}