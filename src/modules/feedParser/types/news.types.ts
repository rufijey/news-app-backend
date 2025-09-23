export interface News {
    id: string;
    title: string | null;
    date: string | null;
    contentSnippet: string;
    source: string;
    link: string;
}

export interface Article {
    title: string;
    image?: string;
    text: string;
}
