import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Icons } from '@shared/features/icons/icons';

@Component({
	selector: 'do-attach-files',
	templateUrl: './attach-files.component.html',
	styleUrls: ['./attach-files.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AttachFilesComponent implements OnInit {
	public readonly Icons = Icons;

	public files = [
		{ name: 'file.zip', icon: Icons.Folder },
		{ name: 'image.png', icon: Icons.Photo },
		{ name: 'text.pdf', icon: Icons.TextDoc },
	];

	constructor() {}

	ngOnInit(): void {}
}
