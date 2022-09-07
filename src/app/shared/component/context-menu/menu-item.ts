import { Icons } from '@shared/modules/icons/icons';

export interface MenuItem {
	title: string;
	action: (...args: any) => void;
	visible: (...args: any) => boolean;
	icon?: Icons | string;
}
