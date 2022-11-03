import { Component, ChangeDetectionStrategy, HostListener } from '@angular/core';
import { UtilitiesService } from '@app/services/utilities.service';

@Component({
	selector: 'do-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
	constructor(private utilities: UtilitiesService) {}

	@HostListener('document:click', ['$event']) handleDocumentClick(event: MouseEvent): void {
		if (event.target) {
			this.utilities.setClickTarget(event.target as HTMLElement);
		}
	}

	@HostListener('document:keydown.escape') handleEscapePress(): void {
		this.utilities.notifyEscapePressed();
	}
}
