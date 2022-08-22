import { Icons } from '@shared/modules/icons/icons';

export interface Link {
	title: string;
	path: string | string[];
	icon: Icons;
	visible: () => boolean;
}
