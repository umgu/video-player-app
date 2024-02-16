export interface Video {
    id: string,
    description: string,
    sources: string[],
    subtitle: string,
    thumb: string,
    title: string,
    seekTime?: number
}