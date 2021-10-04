import { NewsInfo } from "@data/api/news-service/models/news-info";

export interface ArticlePreview extends Omit<NewsInfo, 'preview'> {
	preview: string;
}

export interface Article extends ArticlePreview {
	content: string;
}
