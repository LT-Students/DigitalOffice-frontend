import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Icons } from '@shared/modules/icons/icons';
import { fromPromise } from 'rxjs/internal-compatibility';
import imageCompression from 'browser-image-compression';
import { finalize, switchMap } from 'rxjs/operators';
import { ImageContent } from '@api/gateway-service/models/image-content';
import { ReplaySubject, Subscription } from 'rxjs';
import { LoadingState } from '@app/utils/loading-state';

@Component({
	selector: 'do-feedback-image',
	template: `
		<div class="image-container">
			<img [src]="image | safeImageUrl" alt="Image preview" />
			<div
				*ngIf="{ isLoading: loading$ | async } as loadState"
				class="overlay"
				[class.loading]="loadState.isLoading"
			>
				<mat-spinner *ngIf="loadState.isLoading" [diameter]="24"></mat-spinner>
				<button *ngIf="!loadState.isLoading" class="image-action" doButton (click)="imageActionClicked.emit()">
					<mat-icon [svgIcon]="isPreview ? Icons.Visibility : Icons.Close"></mat-icon>
				</button>
				<span class="mat-caption name">{{ image.name }}</span>
			</div>
		</div>
	`,
	styles: [
		`
			.image-container {
				position: relative;

				width: 128px;
				height: 128px;

				.overlay {
					position: absolute;
					top: 0;
					right: 0;
					left: 0;
					bottom: 0;

					padding: 0 10px;

					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;

					color: #fff;
					background: rgba(0, 0, 0, 0.5);
					opacity: 0;

					transition: opacity 0.2s ease;

					&.loading {
						opacity: 1;
					}

					&:hover {
						opacity: 1;
					}

					.name {
						overflow: hidden;

						width: 100%;

						text-align: center;
						white-space: pre;
						text-overflow: ellipsis;
					}

					.image-action {
						color: #fff;

						&:hover {
							color: rgb(236, 234, 234);
						}
					}
				}

				img {
					width: inherit;
					height: inherit;
					object-fit: cover;
				}
			}
		`,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageComponent extends LoadingState implements OnInit, OnDestroy {
	public readonly Icons = Icons;

	@Output() imageActionClicked = new EventEmitter();
	@Input() image!: File;
	@Input() isPreview = false;

	public loadedImage = new ReplaySubject<ImageContent>(1);
	private subscription?: Subscription;

	constructor() {
		super();
	}

	public ngOnInit(): void {
		if (!this.isPreview) {
			this.setLoading(true);
			this.subscription = fromPromise(imageCompression(this.image, { maxSizeMB: 1, useWebWorker: true }))
				.pipe(
					switchMap((image: File) => fromPromise(imageCompression.getDataUrlFromFile(image))),
					finalize(() => this.setLoading(false))
				)
				.subscribe({
					next: (b64: string) => {
						this.loadedImage.next({
							name: this.image.name,
							content: b64,
							extension: `.${this.image.type.split('/')[1]}`,
						});
					},
				});
		}
	}

	public ngOnDestroy(): void {
		this.subscription?.unsubscribe();
	}
}
