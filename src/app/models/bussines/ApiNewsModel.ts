export interface ApiNewsModel {
    status: string;
    totalResults: number;
    articles: Article[];
}

interface Source {
    id?: any;
    name: string;
}

export interface Article {
    source: Source;
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: Date;
    content: string;
}
