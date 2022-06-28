import { Injectable } from '@angular/core';
import { MenuItem } from '@shared/component/context-menu/menu-item';
import { Icons } from '@shared/features/icons/icons';

@Injectable()
export class ContextMenuService {
	constructor() {}

	public getItems(): MenuItem[] {
		return [
			{ title: 'Добавить документ', icon: Icons.Add, action: () => {}, visible: () => true },
			{ title: 'Удалить документ', icon: Icons.Close, action: () => {}, visible: () => true },
			{ title: 'Скачать', icon: Icons.Download, action: () => {}, visible: () => true },
		];
	}
}