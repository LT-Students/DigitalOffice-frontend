import { OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Pipe({
	name: 'safeImageUrl',
})
export class SafeImageUrlPipe implements PipeTransform, OnDestroy {
	private imageUrl!: string;

	constructor(private sanitizer: DomSanitizer) {}

	transform(image: File): SafeUrl {
		this.imageUrl = URL.createObjectURL(image);
		return this.sanitizer.bypassSecurityTrustUrl(this.imageUrl);
	}

	public ngOnDestroy(): void {
		URL.revokeObjectURL(this.imageUrl);
	}
}
