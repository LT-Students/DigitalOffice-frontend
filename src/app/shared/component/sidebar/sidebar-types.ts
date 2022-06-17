import { Icons } from '@shared/features/icons/icons';

export interface Link {
	title: string;
	path: string | string[];
	icon: Icons;
	visible: () => boolean;
}
