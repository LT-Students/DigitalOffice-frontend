import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Icons } from '@shared/modules/icons/icons';

@Component({
	selector: 'do-image',
	template: `
		<div class="image-container">
			<img [src]="imageSrc" alt="Image preview" />
			<div class="overlay">
				<button class="remove-button" doButton (click)="imageRemoved.emit()">
					<mat-icon [svgIcon]="Icons.Close"></mat-icon>
				</button>
				<span class="mat-caption name">{{ imageName }}</span>
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

					.remove-button {
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
export class ImageComponent implements OnInit {
	public readonly Icons = Icons;

	@Output() imageRemoved = new EventEmitter();
	@Input()
	set image(image: File) {
		this.imageSrc = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(image));
		this.imageName = image.name;
	}
	public imageSrc?: SafeUrl;
	public imageName = '';

	constructor(private sanitizer: DomSanitizer) {}

	public ngOnInit(): void {}
}
