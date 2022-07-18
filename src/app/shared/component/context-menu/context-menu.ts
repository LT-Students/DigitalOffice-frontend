import { MenuItem } from '@app/models/menu-item';
import { ContextMenuComponent } from '@shared/component/context-menu/context-menu.component';

export abstract class ContextMenu {
	abstract getMenuItems(): MenuItem[];
	abstract setContextMenu(menuRef: ContextMenuComponent): void;
	abstract openContextMenu(event: MouseEvent, obj: any): void;
}
