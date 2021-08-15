//@ts-nocheck
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'do-archive',
	templateUrl: './archive.component.html',
	styleUrls: ['./archive.component.scss'],
changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArchiveComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}
}
