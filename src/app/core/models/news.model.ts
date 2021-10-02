import { NewsInfo } from "@data/api/news-service/models/news-info";

// Заменить на абстракцию или класс у Ромы
interface Block {
	id: string;
	type: string;
	data: any;
}

export interface ArticlePreview extends Omit<NewsInfo, 'preview'> {
	preview: any; // Тут тип из editorJS
}

export interface Article extends ArticlePreview {
	content: any;
	'createdBy'?: string
}
