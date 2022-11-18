import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DialogService, ModalWidth } from '@shared/component/dialog/dialog.service';
import { CreateWikiNodeDialogComponent } from './create-wiki-node-dialog/create-wiki-node-dialog.component';

@Component({
	selector: 'do-edit-page',
	templateUrl: './edit-page.component.html',
	styleUrls: ['./edit-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditPageComponent {
	constructor(private dialog: DialogService) {}

	public onCreateNode(): void {
		this.dialog.open(CreateWikiNodeDialogComponent, { width: ModalWidth.S });
	}
}
