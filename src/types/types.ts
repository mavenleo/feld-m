export type Api = {
    API: string,
    Description: string,
    Category: string,
    HTTPS: boolean,
    Auth: string,
    Cors: string,
    Link: string
}

export type ApiResponse = {
    count: number,
    entries: Array<Api>
}

export type CategoryResponse = {
    count: number,
    categories: Array<string>
}

type Filter = {
    title: string,
    category: string
}

export type Data = {
    apis: Array<Api>,
    categories: Array<string>,
    filter: Filter,
    loadingState: boolean
}
