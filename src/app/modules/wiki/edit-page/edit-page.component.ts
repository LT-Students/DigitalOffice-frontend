import { ChangeDetectionStrategy, Component, ViewContainerRef } from '@angular/core';
import { DialogService, ModalWidth } from '@shared/component/dialog/dialog.service';
import { WikiStateService } from '../services';
import { CreateWikiNodeDialogComponent } from './create-wiki-node-dialog/create-wiki-node-dialog.component';

@Component({
	selector: 'do-edit-page',
	templateUrl: './edit-page.component.html',
	styleUrls: ['./edit-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditPageComponent {
	public wikiTree$ = this.wikiState.tree$;

	constructor(private dialog: DialogService, private vcr: ViewContainerRef, private wikiState: WikiStateService) {}

	public onCreateNode(): void {
		this.dialog.open(CreateWikiNodeDialogComponent, { width: ModalWidth.S, viewContainerRef: this.vcr });
	}
}
