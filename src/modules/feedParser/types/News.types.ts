export interface NewsItem {
    id: string;
    title: string | null;
    date: string | null;
    contentSnippet: string;
    source: string;
}