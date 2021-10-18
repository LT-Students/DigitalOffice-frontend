import { API } from '@editorjs/editorjs';
import { BlockTuneData } from '@editorjs/editorjs/types/block-tunes/block-tune-data';

interface Indicator {
	name: 'preview' | 'hidden';
	title: string;
	icon: {
		active: string;
		inactive: string;
	};
}

interface PreviewHiddenTune extends BlockTuneData {
	preview: boolean;
	hidden: boolean;
}

export class Preview {
	public static isTune = true;
	public static _previewCount = 0;
	private static MAX_PREVIEW = 2;

	private _data: PreviewHiddenTune;
	private readonly _api: API;
	private readonly _indicators: Indicator[];
	private readonly _indicatorsBlock: HTMLElement;

	constructor({ api, data }: { api: API; data: BlockTuneData }) {
		this._api = api;
		this._data = data || { preview: false, hidden: false };

		if (this._data.preview) {
			Preview._previewCount++;
		}

		this._indicators = [
			{
				name: 'preview',
				title: 'Превью',
				icon: {
					active:
						'<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
						'<path d="M19.2831 7.27657L13.3323 6.41173L10.6722 1.01876C10.5995 0.871102 10.48 0.751571 10.3323 0.678915C9.96199 0.496102 9.51199 0.648446 9.32684 1.01876L6.66668 6.41173L0.715901 7.27657C0.551838 7.30001 0.401838 7.37735 0.286995 7.49454C0.148155 7.63724 0.0716479 7.82923 0.0742847 8.02831C0.0769216 8.22739 0.158487 8.41728 0.301057 8.55626L4.60653 12.7539L3.58934 18.6813C3.56549 18.8191 3.58074 18.961 3.63338 19.0906C3.68602 19.2203 3.77394 19.3326 3.88716 19.4148C4.00038 19.497 4.13437 19.5459 4.27395 19.5558C4.41352 19.5658 4.5531 19.5364 4.67684 19.4711L9.99949 16.6727L15.3222 19.4711C15.4675 19.5484 15.6362 19.5742 15.7979 19.5461C16.2057 19.4758 16.48 19.0891 16.4097 18.6813L15.3925 12.7539L19.6979 8.55626C19.8151 8.44142 19.8925 8.29142 19.9159 8.12735C19.9792 7.7172 19.6932 7.33751 19.2831 7.27657Z" fill="#FF8A65"/>\n' +
						'</svg>\n',
					inactive:
						'<svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
						'<path d="M16.734 5.89747L11.775 5.17676L9.55817 0.682624C9.49763 0.559578 9.39802 0.459968 9.27497 0.399421C8.96638 0.247078 8.59138 0.374031 8.43708 0.682624L6.22028 5.17676L1.2613 5.89747C1.12458 5.917 0.999579 5.98145 0.903876 6.07911C0.788176 6.19803 0.72442 6.35802 0.726617 6.52392C0.728815 6.68982 0.796786 6.84806 0.915594 6.96387L4.50348 10.4619L3.65583 15.4014C3.63595 15.5163 3.64867 15.6344 3.69253 15.7425C3.7364 15.8505 3.80966 15.9441 3.90401 16.0127C3.99836 16.0812 4.11002 16.1219 4.22634 16.1302C4.34265 16.1385 4.45896 16.114 4.56208 16.0596L8.99763 13.7275L13.4332 16.0596C13.5543 16.124 13.6949 16.1455 13.8297 16.1221C14.1695 16.0635 14.398 15.7412 14.3394 15.4014L13.4918 10.4619L17.0797 6.96387C17.1773 6.86817 17.2418 6.74317 17.2613 6.60645C17.314 6.26466 17.0758 5.94825 16.734 5.89747ZM11.982 9.96973L12.6871 14.0772L8.99763 12.1397L5.30817 14.0791L6.01325 9.97169L3.02888 7.06153L7.15388 6.46192L8.99763 2.72559L10.8414 6.46192L14.9664 7.06153L11.982 9.96973Z" fill="#9E9E9E"/>\n' +
						'</svg>\n',
				},
			},
			{
				name: 'hidden',
				title: 'Скрыть из новости',
				icon: {
					active:
						'<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
						'<path d="M10.0542 12.1877C10.6344 12.1877 11.1908 11.9573 11.601 11.547C12.0112 11.1368 12.2417 10.5804 12.2417 10.0002C12.2417 9.93616 12.2388 9.87268 12.2333 9.80999L9.86396 12.1793C9.92665 12.1848 9.98993 12.1877 10.0542 12.1877ZM17.2948 3.23381L16.4604 2.40022C16.4311 2.37094 16.3914 2.35449 16.35 2.35449C16.3086 2.35449 16.2688 2.37094 16.2395 2.40022L14.1044 4.53596C12.9265 3.93401 11.6025 3.63303 10.1323 3.63303C6.37841 3.63303 3.57763 5.58811 1.72997 9.49827C1.6557 9.65553 1.61719 9.82728 1.61719 10.0012C1.61719 10.1751 1.6557 10.3469 1.72997 10.5041C2.46825 12.0592 3.35725 13.3056 4.39696 14.2434L2.33075 16.3088C2.30147 16.3381 2.28502 16.3778 2.28502 16.4193C2.28502 16.4607 2.30147 16.5004 2.33075 16.5297L3.16454 17.3635C3.19384 17.3928 3.23357 17.4092 3.27499 17.4092C3.31641 17.4092 3.35614 17.3928 3.38544 17.3635L17.2948 3.45491C17.3093 3.4404 17.3209 3.42316 17.3287 3.4042C17.3366 3.38523 17.3406 3.36489 17.3406 3.34436C17.3406 3.32383 17.3366 3.3035 17.3287 3.28453C17.3209 3.26556 17.3093 3.24833 17.2948 3.23381ZM6.61669 10.0002C6.61664 9.40648 6.77037 8.82285 7.06292 8.30619C7.35546 7.78952 7.77684 7.35744 8.28601 7.05203C8.79518 6.74663 9.37477 6.57831 9.96833 6.56348C10.5619 6.54865 11.1492 6.68781 11.6729 6.96741L10.7233 7.91702C10.3404 7.79439 9.93102 7.77962 9.54021 7.87433C9.1494 7.96904 8.79223 8.16957 8.50788 8.45391C8.22354 8.73826 8.02301 9.09543 7.9283 9.48624C7.83359 9.87705 7.84836 10.2864 7.97099 10.6694L7.02138 11.619C6.75489 11.1211 6.61586 10.5649 6.61669 10.0002Z" fill="#FF8A65"/>\n' +
						'<path d="M18.5363 9.49609C17.8488 8.04818 17.0305 6.86751 16.0814 5.9541L13.2662 8.76953C13.5035 9.38987 13.5561 10.0657 13.4177 10.7152C13.2792 11.3648 12.9556 11.9604 12.4859 12.4301C12.0163 12.8997 11.4207 13.2233 10.7711 13.3618C10.1215 13.5003 9.44573 13.4477 8.82539 13.2104L6.4375 15.5982C7.54531 16.1109 8.77747 16.3672 10.134 16.3672C13.8879 16.3672 16.6887 14.4121 18.5363 10.502C18.6106 10.3447 18.6491 10.1729 18.6491 9.99902C18.6491 9.82511 18.6106 9.65335 18.5363 9.49609Z" fill="#FF8A65"/>\n' +
						'</svg>\n',
					inactive:
						'<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
						'<path d="M10.0542 12.1877C10.6344 12.1877 11.1908 11.9573 11.601 11.547C12.0112 11.1368 12.2417 10.5804 12.2417 10.0002C12.2417 9.93616 12.2388 9.87268 12.2333 9.80999L9.86396 12.1793C9.92665 12.1848 9.98993 12.1877 10.0542 12.1877ZM17.2948 3.23381L16.4604 2.40022C16.4311 2.37094 16.3914 2.35449 16.35 2.35449C16.3086 2.35449 16.2688 2.37094 16.2395 2.40022L14.1044 4.53596C12.9265 3.93401 11.6025 3.63303 10.1323 3.63303C6.37841 3.63303 3.57763 5.58811 1.72997 9.49827C1.6557 9.65553 1.61719 9.82728 1.61719 10.0012C1.61719 10.1751 1.6557 10.3469 1.72997 10.5041C2.46825 12.0592 3.35725 13.3056 4.39696 14.2434L2.33075 16.3088C2.30147 16.3381 2.28502 16.3778 2.28502 16.4193C2.28502 16.4607 2.30147 16.5004 2.33075 16.5297L3.16454 17.3635C3.19384 17.3928 3.23357 17.4092 3.27499 17.4092C3.31641 17.4092 3.35614 17.3928 3.38544 17.3635L17.2948 3.45491C17.3093 3.4404 17.3209 3.42316 17.3287 3.4042C17.3366 3.38523 17.3406 3.36489 17.3406 3.34436C17.3406 3.32383 17.3366 3.3035 17.3287 3.28453C17.3209 3.26556 17.3093 3.24833 17.2948 3.23381ZM6.61669 10.0002C6.61664 9.40648 6.77037 8.82285 7.06292 8.30619C7.35546 7.78952 7.77684 7.35744 8.28601 7.05203C8.79518 6.74663 9.37477 6.57831 9.96833 6.56348C10.5619 6.54865 11.1492 6.68781 11.6729 6.96741L10.7233 7.91702C10.3404 7.79439 9.93102 7.77962 9.54021 7.87433C9.1494 7.96904 8.79223 8.16957 8.50788 8.45391C8.22354 8.73826 8.02301 9.09543 7.9283 9.48624C7.83359 9.87705 7.84836 10.2864 7.97099 10.6694L7.02138 11.619C6.75489 11.1211 6.61586 10.5649 6.61669 10.0002Z" fill="#9D9D9D"/>\n' +
						'<path d="M18.5363 9.49609C17.8488 8.04818 17.0305 6.86751 16.0814 5.9541L13.2662 8.76953C13.5035 9.38987 13.5561 10.0657 13.4177 10.7152C13.2792 11.3648 12.9556 11.9604 12.4859 12.4301C12.0163 12.8997 11.4207 13.2233 10.7711 13.3618C10.1215 13.5003 9.44573 13.4477 8.82539 13.2104L6.4375 15.5982C7.54531 16.1109 8.77747 16.3672 10.134 16.3672C13.8879 16.3672 16.6887 14.4121 18.5363 10.502C18.6106 10.3447 18.6491 10.1729 18.6491 9.99902C18.6491 9.82511 18.6106 9.65335 18.5363 9.49609Z" fill="#9D9D9D"/>\n' +
						'</svg>\n',
				},
			},
		];

		this._indicatorsBlock = document.createElement('div');
		this._indicatorsBlock.classList.add('ce-block__indicators');
	}

	public render(): HTMLElement {
		const wrapper = document.createElement('div');

		this._indicators.forEach(({ name, title, icon }: Indicator) => {
			const button = document.createElement('button');
			button.classList.add(this._api.styles.settingsButton);
			button.innerHTML = this._data[name] ? icon.active : icon.inactive;

			this._api.tooltip.onHover(button, title);
			wrapper.classList.toggle(this._api.styles.settingsButtonActive, Boolean(this._data[name]));
			wrapper.appendChild(button);

			this._api.listeners.on(button, 'click', () => {
				if (name === 'hidden' || (name === 'preview' && Preview._previewCount < Preview.MAX_PREVIEW)) {
					Preview._previewCount = this._data[name] ? Preview._previewCount - 1 : Preview._previewCount + 1;

					this._tuneClicked(button, name, icon);
				}
			});
		});

		return wrapper;
	}

	private _tuneClicked(button: HTMLButtonElement, name: Indicator['name'], icon: Indicator['icon']) {
		this._data = { ...this._data, [name]: !this._data[name] };
		button.classList.toggle(this._api.styles.settingsButtonActive);
		button.innerHTML = this._data[name] ? icon.active : icon.inactive;
		this._toggleIndicatorsState();
	}

	public wrap(pluginsContent: HTMLElement): HTMLElement {
		const wrapper = document.createElement('div');
		wrapper.style.position = 'relative';

		this._indicators.forEach(({ name, icon }: Indicator) => {
			const button = document.createElement('span');
			button.classList.add('ce-block-indicator');
			button.dataset.name = name;
			button.innerHTML = icon.active;
			this._api.listeners.on(button, 'click', () => {
				this._data = {
					...this._data,
					[name]: false,
				};
				Preview._previewCount--;
				this._toggleIndicatorsState();
			});

			this._indicatorsBlock?.appendChild(button);
		});

		this._toggleIndicatorsState();

		wrapper.append(pluginsContent, this._indicatorsBlock);

		return wrapper;
	}

	private _toggleIndicatorsState(): void {
		Array.from(this._indicatorsBlock?.children).forEach((el) => {
			el.classList.toggle('ce-block-indicator_active', this._data[(el as HTMLElement).dataset.name as string]);
		});
	}

	public save(): PreviewHiddenTune {
		return this._data;
	}
}
