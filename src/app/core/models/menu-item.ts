export interface MenuItem {
	title: string;
	action: (...args: any) => void;
	visible: (...args: any) => boolean;
	icon?: string;
}
