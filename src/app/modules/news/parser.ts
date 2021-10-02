import { Injectable } from "@angular/core";
import { ImageNewsService } from "@app/services/image/image-news.service";
import { forkJoin, Observable, of } from "rxjs";
import { map } from "rxjs/operators";

import { IOutputBlockData } from '../../core/models/editorjs/output-data.interface'

interface ItemList {
	content: string,
	items: Array<ItemList>
}

export interface Block {
	type: 'paragraph' | 'header' | 'list' | 'image' | 'quote' | 'delimiter',
	data: {
		text?: string;
		level?: number;
		caption?: string;
		aligment?: string;
		url?: string;
		file?: {
			url?: string;
		};
		stretched?: boolean;
		withBackground?: boolean;
		withBorder?: boolean;
		items?: Array<string> | Array<ItemList>;
		style?: string;
	}
}

@Injectable({
	providedIn: 'root'
})
export class EditorJSParser {
	constructor(
		private _imageNewsService: ImageNewsService
	) {

	}

	public parseBlock(block: IOutputBlockData): Observable<string> {
		switch (block.type) {
			case 'image': {
				return this._imageNewsService
					.getImageNews(block.data.file.imageId)
					.pipe(
						map(image => {
							let imgClasses = "ce-img";
							let wrapperClasses = "";
							let blockContentClasses = block.data.stretched ? "" : "ce-block__content";

							if (block.data.stretched) {
								imgClasses += " ce-img-fullwidth";
							}
							if (block.data.withBorder) {
								wrapperClasses += " ce-img-with-border";
							}
							if (block.data.withBackground) {
								wrapperClasses += " ce-img-with-background";
								imgClasses += " ce-img-background-width";
							}

							let src = `data:image/${image.body?.extension?.slice(1)};base64,${image.body?.content}`

							if (block.data.caption) {
								return `<div class='ce-block'>
									<div class='${blockContentClasses}'>
										<figure>
											<div class='${wrapperClasses}'>
												<img class='${imgClasses}' src=${src} alt="image">	
											<div>
											<figcaption class='img__caption'>${block.data.caption}</figcaption>
										</figure>
									</div>
								</div>`;
							} else {
								return `<div class='ce-block'>
									<div class='${blockContentClasses}'>
										<div class='${wrapperClasses}'>
											<img class='${imgClasses}' src=${src} alt="image" />
										</div>
									</div>
								</div>`;
							}
						}))
			}
			case 'delimiter': {
				return of(`<div class='ce-block'>
				<div class='ce-block__content'>
					<div class='ce-delimiter cdx-block'>
					</div>
				</div>
				</div>`)
			}
			case 'quote': {
				let caption: string = "";
				let style: string = "";

				if (block.data.caption) caption = `<figcaption>-${block.data.caption}</figcaption>`
				if (block.data.aligment) style = `text-align: ${block.data.aligment}`

				return of(`<div class='ce-block'>
				<div class='ce-block__content'>
					<div class='ce-quote cdx-block'>
						<figure style='${style}'>
							<blockquote><p>"${block.data.text}"</p></blockquote>
							${caption}
						</figure>
					</div>
				</div>
			</div>`);
			}
			case 'list': {
				const listStyle = block.data.style === "unordered" ? "ul" : "ol";
				const listClasses = block.data.style === "unordered" ? '' : 'cdx-list'
				const itemClasses = listStyle === 'ol' ? 'cdx-list__item-ordered' : 'cdx-list__item';

				const recursor = (items: any, listStyle: string) => {
					const list = items.map((item: any) => {
						if (item.content && item.items.length === 0) return `<li class='${itemClasses}'>${item.content}</li>`;

						let list = "";
						if (item.items) list = recursor(item.items, listStyle);
						return `<li class='${itemClasses}'>${item.content} ${list}</li>`;
					});

					return `<${listStyle} class='list ${listClasses}'>${list.join("")}</${listStyle}>`;
				};

				return of(`<div class='ce-block'>
					<div class='ce-block__content'>
						${recursor(block.data.items, listStyle)}
					</div>
				</div>`);
			}
			case 'header': {
				return of(`<div class='ce-block'>
				<div class='ce-block__content'>
					<h${block.data.level}>${block.data.text}</h${block.data.level}>
				</div>
				</div>`);
			}
			case 'paragraph': {
				return of(`<div class='ce-block'>
				<div class='ce-block__content'>
					<p>${block.data.text}</p>
				</div>
				</div>`)
			}
			default: {
				return of('');
			}
		}
	}

	public parse(blocks: Array<Block>): Observable<string[]> {
		if (blocks.length === 0) return of([])
		return forkJoin(
			blocks.map(block => this.parseBlock(block))
		)
	}
}
