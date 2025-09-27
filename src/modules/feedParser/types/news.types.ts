export interface News {
    id: string;
    title: string | null;
    date: string | null;
    contentSnippet: string;
    source: string;
    link: string;
    image: string;
}

export interface Article {
    title: string;
    image?: string;
    text: string;
}
