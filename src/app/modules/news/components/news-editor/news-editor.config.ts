// @ts-ignore
import Header from '@editorjs/header';
// @ts-ignore
import Image from '@editorjs/image';
import { Injectable } from '@angular/core';
import { ImageNewsService } from '@app/services/image/image-news.service';
import { EditorConfig } from '@editorjs/editorjs';
import { map, switchMap } from 'rxjs/operators';
import { OperationResultStatusType } from '@data/api/image-service/models/operation-result-status-type';
import { CreateImageService } from '@app/services/create-image.service';
import { CreateImageRequest } from '@data/api/image-service/models/create-image-request';

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

	private _createConfig(): EditorConfig {
		return {
			holder: 'editorjs',
			tools: {
				header: {
					class: Header,
					inlineToolbar: ['link', 'bold', 'italic'],
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
		};
	}
}
