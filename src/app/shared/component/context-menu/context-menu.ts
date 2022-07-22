import { ContextMenuComponent } from '@shared/component/context-menu/context-menu.component';
import { MenuItem } from '@shared/component/context-menu/menu-item';

export abstract class ContextMenu {
	abstract getMenuItems(): MenuItem[];
	abstract setContextMenu(menuRef: ContextMenuComponent): void;
	abstract openContextMenu(event: MouseEvent, obj: any): void;
}
