export const getFileNameFromUrl = (url: string) => {
    try {
        const pathname = new URL(url).pathname;
        return pathname.substring(pathname.lastIndexOf('/') + 1);
    } catch (error: any) {
        console.error('Invalid URL:', error);
        return null;
    }
};
