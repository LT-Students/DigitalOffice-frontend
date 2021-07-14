import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OfficeApiService } from '@data/api/company-service/services/office-api.service';

@Component({
	selector: 'do-new-office',
	templateUrl: './new-office.component.html',
	styleUrls: ['./new-office.component.scss'],
})
export class NewOfficeComponent implements OnInit {
	public officeForm: FormGroup;

	constructor(private formBuilder: FormBuilder, private officeApiService: OfficeApiService) {}

	ngOnInit(): void {
		this.officeForm = this.formBuilder.group({
			city: ['', [Validators.required]],
			address: ['', [Validators.required]],
			name: [''],
		});
	}

	createOffice(): void {
		this.officeApiService
			.createOffice({
				body: {
					city: this.officeForm.get('city').value,
					address: this.officeForm.get('address').value,
					name: this.officeForm.get('name').value,
				},
			})
			.subscribe(
				(res) => console.log(res),
				(err) => console.log(err)
			);
	}
}
