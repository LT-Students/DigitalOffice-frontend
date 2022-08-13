import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DoValidators } from '@app/validators/do-validators';

@Component({
	selector: 'do-feedback-form',
	templateUrl: './feedback-form.component.html',
	styleUrls: ['./feedback-form.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackFormComponent implements OnInit {
	public form = this.fb.group({
		category: ['Сломалось', [DoValidators.required]],
		comment: ['', [DoValidators.required]],
	});

	constructor(private fb: FormBuilder) {}

	ngOnInit(): void {}
}
