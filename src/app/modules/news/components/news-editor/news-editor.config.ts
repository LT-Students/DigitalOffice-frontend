// @ts-ignore
import Header from '@editorjs/header';
// @ts-ignore
import Underline from '@editorjs/underline';
// @ts-ignore
import Marker from '@editorjs/marker';
// @ts-ignore
import NestedList from '@editorjs/nested-list';
// @ts-ignore
import Quote from '@editorjs/quote';
// @ts-ignore
import Delimiter from '@editorjs/delimiter';
import { ElementRef, Injectable } from '@angular/core';
import { ImageNewsService } from '@app/services/image/image-news.service';
import { API, BlockAPI, EditorConfig, OutputData } from '@editorjs/editorjs';
import { map, switchMap } from 'rxjs/operators';
import { OperationResultStatusType } from '@data/api/image-service/models/operation-result-status-type';
import { CreateImageService } from '@app/services/create-image.service';
import { CreateImageRequest } from '@data/api/image-service/models/create-image-request';
import { LocalStorageService } from '@app/services/local-storage.service';
//@ts-ignore
import Image from '../../editorjs-plugins/blocks/image/bundle.js';
import { Preview } from '../../editorjs-plugins/block-tunes/preview';

@Injectable({
	providedIn: 'root',
})
export class NewsEditorConfig {
	constructor(
		private _imageNewsService: ImageNewsService,
		private _createImageService: CreateImageService,
		private _lsService: LocalStorageService
	) {}

	public createConfig(initialData?: OutputData): EditorConfig {
		return {
			holder: 'editorjs',
			// onReady: () => {
			// 	const undo = new Undo({ editor: editorRef });
			// 	undo.initialize(initialData);
			// },
			data: initialData,
			tools: {
				paragraph: {
					tunes: ['previewTune'],
					config: {
						placeholder: 'Нажмите Tab для выбора инструмента',
					},
				},
				header: {
					class: Header,
					inlineToolbar: ['link', 'bold', 'italic'],
					config: {
						levels: [2, 3, 4],
						defaultLevel: 2,
					},
				},
				underline: { class: Underline, shortcut: 'CTRL+U' },
				marker: { class: Marker, shortcut: 'CTRL+SHIFT+M' },
				list: {
					class: NestedList,
					inlineToolbar: true,
				},
				delimiter: Delimiter,
				previewTune: Preview,
				quote: {
					class: Quote,
					inlineToolbar: true,
					shortcut: 'CMD+SHIFT+O',
					config: {
						quotePlaceholder: 'Цитата',
						captionPlaceholder: 'Автор',
					},
				},
				image: {
					class: Image,
					tunes: ['previewTune'],
					config: {
						additionalRequestHeaders: {
							token: this._lsService.get('access_token'),
						},
						uploader: {
							uploadByFile: (file: File) => {
								return this._createImageService
									.getCreateImageRequest(file)
									.pipe(
										switchMap((ciRequest: CreateImageRequest) =>
											this._imageNewsService.createImageNews(ciRequest)
										),
										map((response) => {
											console.log(response);
											if (response.status === OperationResultStatusType.FullSuccess) {
												const imageUrl = `https://image.ltdo.xyz/fileimage/get?imageid=${response.body?.imageId}&source=News`;
												return {
													success: 1,
													file: {
														url: imageUrl,
														imageId: response.body?.imageId,
														previewId: response.body?.previewId,
													},
												};
											} else {
												return {
													success: 0,
													file: {},
												};
											}
										})
									)
									.toPromise();
							},
						},
					},
				},
			},
		};
	}
}
