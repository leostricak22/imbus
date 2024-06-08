export function timeAgo(date: Date): string {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    let interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
        return "Prije " + interval + " godina";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return "Prije " + interval + " mjeseci";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return "Prije " + interval + " dana";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return "Prije " + interval + " sati";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return "Prije " + interval + " minuta";
    }
    return "Upravo sad";
}
