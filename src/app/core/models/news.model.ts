import { NewsInfo } from "@data/api/news-service/models/news-info";

export interface ArticlePreview extends Omit<NewsInfo, 'preview'> {
	preview: any;
}

export interface Article extends ArticlePreview {
	content: any;
}
