import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'do-profile-image',
	templateUrl: './profile-image.component.html',
	styleUrls: ['./profile-image.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class ProfileImageComponent implements OnInit {
	@Input() src: string;

	constructor() {}

	ngOnInit(): void {}
}
