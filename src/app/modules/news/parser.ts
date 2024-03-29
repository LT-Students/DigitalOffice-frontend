import { Injectable } from '@angular/core';
import { forkJoin, Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { ImageNewsService } from '@app/services/image/image-news.service';
import { IOutputBlockData } from './models/output-data.interface';

@Injectable({
	providedIn: 'root',
})
export class EditorJSParser {
	constructor(private _imageNewsService: ImageNewsService) {}

	public parseBlock(block: IOutputBlockData): Observable<string> {
		switch (block.type) {
			case 'image': {
				return this._imageNewsService.getImageNews(block.data.file.imageId).pipe(
					catchError((err) => {
						const imgNotFound = '<img src="" alt="Image not found">';
						return throwError(imgNotFound);
					}),
					map((image) => {
						const imgClasses: string[] = ['ce-img'];
						const figCaptionClasses: string[] = ['ce-img__caption'];
						const contentClasses: string[] = ['ce-block__content'];

						if (block.data.stretched) {
							imgClasses.push('ce-img-fullwidth');
						}
						if (block.data.withBorder) {
							contentClasses.push('ce-block__content-with-border');
							figCaptionClasses.push('ce-img__caption-with-border');
						}
						if (block.data.withBackground) {
							contentClasses.push('ce-block__content-with-background');
							imgClasses.push('ce-img-centered');
						}

						const src = `data:image/${image.body?.extension?.slice(1)};base64,${image.body?.content}`;

						if (block.data.caption) {
							return `<div class='ce-block'>
												<div class='${contentClasses.join(' ')}'>
													<figure>
														<img class='${imgClasses.join(' ')}' src=${src} alt="image">
														<figcaption class='${figCaptionClasses.join(' ')}'>${block.data.caption}</figcaption>
													</figure>	
												</div>
											</div>`;
						} else {
							return `<div class='ce-block'>
											<div class='${contentClasses.join(' ')}'>
												<img class='${imgClasses.join(' ')}' src=${src} alt="image">	
											</div>
										</div>`;
						}
					})
				);
			}
			case 'delimiter': {
				return of(`<div class='ce-block'>
				<div class='ce-block__content'>
					<div class='ce-delimiter cdx-block'>
					</div>
				</div>
				</div>`);
			}
			case 'quote': {
				let caption = '';
				let style = '';

				if (block.data.caption) {
					caption = `<figcaption>-${block.data.caption}</figcaption>`;
				}
				if (block.data.aligment) {
					style = `text-align: ${block.data.aligment}`;
				}

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
				const listStyle = block.data.style === 'unordered' ? 'ul' : 'ol';
				const listClasses = block.data.style === 'unordered' ? '' : 'cdx-list';
				const itemClasses = listStyle === 'ol' ? 'cdx-list__item-ordered' : 'cdx-list__item';

				const recursor = (items: any, listStyle: string) => {
					const list = items.map((item: any) => {
						if (item.content && item.items.length === 0) {
							return `<li class='${itemClasses}'>${item.content}</li>`;
						}

						let sublist = '';
						if (item.items) {
							sublist = recursor(item.items, listStyle);
						}
						return `<li class='${itemClasses}'>${item.content} ${sublist}</li>`;
					});

					return `<${listStyle} class='ce-list ${listClasses}'>${list.join('')}</${listStyle}>`;
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
				</div>`);
			}
			default: {
				return of('');
			}
		}
	}

	public parse(blocks: Array<IOutputBlockData>): Observable<string[]> {
		if (blocks.length === 0) {
			return of([]);
		}
		return forkJoin(blocks.map((block) => this.parseBlock(block).pipe(catchError((err) => of(err)))));
	}
}
