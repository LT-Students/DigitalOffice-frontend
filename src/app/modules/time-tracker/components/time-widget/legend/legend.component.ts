import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
	selector: 'do-legend',
	templateUrl: './legend.component.html',
	styleUrls: ['./legend.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LegendComponent {
	@Input() labels: string[] = [];
	@Input() colors: string[] = [];
}
