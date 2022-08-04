import { Injectable } from '@angular/core';
import { MenuItem } from '@shared/component/context-menu/menu-item';
import { Icons } from '@shared/modules/icons/icons';
import { DialogService, ModalWidth } from '@app/services/dialog.service';
import { EditFileComponent } from './edit-file/edit-file.component';

@Injectable()
export class ContextMenuService {
	constructor(private dialog: DialogService) {}

	public getItems(): MenuItem[] {
		return [
			{
				title: 'Редактировать документ',
				icon: Icons.Edit,
				action: () => {
					this.dialog.open(EditFileComponent, { width: ModalWidth.M });
				},
				visible: () => true,
			},
			{ title: 'Удалить документ', icon: Icons.Delete, action: () => {}, visible: () => true },
			{ title: 'Скачать', icon: Icons.Download, action: () => {}, visible: () => true },
		];
	}
}
