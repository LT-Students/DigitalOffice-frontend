import { Icons } from '@shared/features/icons/icons';

interface IInputFilterParams {
	placeholder?: string;
	icon?: Icons;
}

export class InputFilterParams implements IInputFilterParams {
	public placeholder?: string;
	public icon?: Icons;

	constructor(params: IInputFilterParams) {
		this.placeholder = params.placeholder;
		this.icon = params.icon;
	}
}
