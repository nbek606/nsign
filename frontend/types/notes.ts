export type TNotes = {
    id?: number,
    title: string,
    body: string,
    created_at?: string
}

export type TNotesRequest = {
    count: number,
    next: string,
    previous: string,
    results: TNotes[]
}