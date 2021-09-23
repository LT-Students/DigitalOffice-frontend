// @ts-ignore
import Header from '@editorjs/header';
// @ts-ignore
import Image from '@editorjs/image';
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
// @ts-ignore
import Undo from 'editorjs-undo';
// @ts-ignore
import AlignmentBlockTune from 'editorjs-text-alignment-blocktune';
import { Injectable } from '@angular/core';
import { ImageNewsService } from '@app/services/image/image-news.service';
import { EditorConfig } from '@editorjs/editorjs';
import { map, switchMap } from 'rxjs/operators';
import { OperationResultStatusType } from '@data/api/image-service/models/operation-result-status-type';
import { CreateImageService } from '@app/services/create-image.service';
import { CreateImageRequest } from '@data/api/image-service/models/create-image-request';
import { Preview } from '../../editorjs-plugins/block-tunes/preview';

@Injectable({
	providedIn: 'root',
})
export class NewsEditorConfig {
	private readonly _editorConfig: EditorConfig;

	constructor(private _imageNewsService: ImageNewsService, private _createImageService: CreateImageService) {
		this._editorConfig = this._createConfig();
	}

	public get editorConfig() {
		return this._editorConfig;
	}
	//TODO rework so we can pass editor's instance to config
	private _createConfig(): EditorConfig {
		return {
			holder: 'editorjs',
			// onReady: () => {
			// 	new Undo();
			// },
			tools: {
				header: {
					class: Header,
					inlineToolbar: ['link', 'bold', 'italic'],
				},
				underline: { class: Underline, shortcut: 'CTRL+U' },
				marker: { class: Marker, shortcut: 'CTRL+SHIFT+M' },
				list: {
					class: NestedList,
					inlineToolbar: true,
				},
				delimiter: Delimiter,
				previewTune: Preview,
				alignmentTune: {
					class: AlignmentBlockTune,
					config: {
						default: 'right',
						blocks: {
							header: 'center',
							list: 'right',
						},
					},
				},
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
					config: {
						uploader: {
							uploadByFile: (file: File) => {
								return this._createImageService
									.getCreateImageRequest(file)
									.pipe(
										switchMap((ciRequest: CreateImageRequest) =>
											this._imageNewsService.createImageNews(ciRequest)
										),
										switchMap((response) =>
											//@ts-ignore
											this._imageNewsService.getImageNews(response.body.imageId)
										),
										map((response) => {
											console.log(response);
											if (response.status === OperationResultStatusType.FullSuccess) {
												const extension = response.body?.extension?.slice(1);
												//@ts-ignore
												const imageUrl = `data:image/${extension};base64,${response.body?.content}`;
												return {
													success: 1,
													file: {
														url: imageUrl,
														urlId:
															'https://image.ltdo.xyz/imagenews/get?imageId=45fed53f-dccf-49b5-b2b3-b366741391e2',
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
			tunes: ['previewTune', 'alignmentTune'],
		};
	}
}
