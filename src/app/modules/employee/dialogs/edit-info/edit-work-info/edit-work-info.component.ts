import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { WorkInfoConfigService } from './work-info-config.service';

@Component({
	selector: 'do-edit-work-info',
	templateUrl: './edit-work-info.component.html',
	styleUrls: ['./edit-work-info.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [WorkInfoConfigService],
})
export class EditWorkInfoComponent implements OnInit {
	public configs$ = this.editWorkInfo.getConfig$();

	constructor(private editWorkInfo: WorkInfoConfigService) {}

	ngOnInit(): void {}
}
