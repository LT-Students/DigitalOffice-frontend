import { API } from '@editorjs/editorjs';
import { BlockTuneData } from '@editorjs/editorjs/types/block-tunes/block-tune-data';
import './index.scss';

export class Preview {
	private _api: API;
	private _data: BlockTuneData;
	private _previewIcon: { [key: string]: string };

	public static get isTune() {
		return true;
	}

	constructor({ api, data }: { api: API; data: BlockTuneData }) {
		this._api = api;
		this._data = data || { preview: false };

		this._previewIcon = {
			active:
				'<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
				'<path d="M19.2831 7.27657L13.3323 6.41173L10.6722 1.01876C10.5995 0.871102 10.48 0.751571 10.3323 0.678915C9.96199 0.496102 9.51199 0.648446 9.32684 1.01876L6.66668 6.41173L0.715901 7.27657C0.551838 7.30001 0.401838 7.37735 0.286995 7.49454C0.148155 7.63724 0.0716479 7.82923 0.0742847 8.02831C0.0769216 8.22739 0.158487 8.41728 0.301057 8.55626L4.60653 12.7539L3.58934 18.6813C3.56549 18.8191 3.58074 18.961 3.63338 19.0906C3.68602 19.2203 3.77394 19.3326 3.88716 19.4148C4.00038 19.497 4.13437 19.5459 4.27395 19.5558C4.41352 19.5658 4.5531 19.5364 4.67684 19.4711L9.99949 16.6727L15.3222 19.4711C15.4675 19.5484 15.6362 19.5742 15.7979 19.5461C16.2057 19.4758 16.48 19.0891 16.4097 18.6813L15.3925 12.7539L19.6979 8.55626C19.8151 8.44142 19.8925 8.29142 19.9159 8.12735C19.9792 7.7172 19.6932 7.33751 19.2831 7.27657Z" fill="#FF8A65"/>\n' +
				'</svg>\n',
			inactive:
				'<svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
				'<path d="M16.734 5.89747L11.775 5.17676L9.55817 0.682624C9.49763 0.559578 9.39802 0.459968 9.27497 0.399421C8.96638 0.247078 8.59138 0.374031 8.43708 0.682624L6.22028 5.17676L1.2613 5.89747C1.12458 5.917 0.999579 5.98145 0.903876 6.07911C0.788176 6.19803 0.72442 6.35802 0.726617 6.52392C0.728815 6.68982 0.796786 6.84806 0.915594 6.96387L4.50348 10.4619L3.65583 15.4014C3.63595 15.5163 3.64867 15.6344 3.69253 15.7425C3.7364 15.8505 3.80966 15.9441 3.90401 16.0127C3.99836 16.0812 4.11002 16.1219 4.22634 16.1302C4.34265 16.1385 4.45896 16.114 4.56208 16.0596L8.99763 13.7275L13.4332 16.0596C13.5543 16.124 13.6949 16.1455 13.8297 16.1221C14.1695 16.0635 14.398 15.7412 14.3394 15.4014L13.4918 10.4619L17.0797 6.96387C17.1773 6.86817 17.2418 6.74317 17.2613 6.60645C17.314 6.26466 17.0758 5.94825 16.734 5.89747ZM11.982 9.96973L12.6871 14.0772L8.99763 12.1397L5.30817 14.0791L6.01325 9.97169L3.02888 7.06153L7.15388 6.46192L8.99763 2.72559L10.8414 6.46192L14.9664 7.06153L11.982 9.96973Z" fill="#9E9E9E"/>\n' +
				'</svg>\n',
		};
	}

	// public sanitize: SanitizerConfig;
	//
	public render(): HTMLElement {
		const wrapper = document.createElement('div');

		const button = document.createElement('button');
		button.classList.add(this._api.styles.settingsButton);
		button.innerHTML = this._previewIcon.inactive;

		wrapper.classList.toggle(this._api.styles.settingsButtonActive, this._data.preview === true);
		wrapper.appendChild(button);

		button.addEventListener('click', () => {
			this._data = { preview: !this._data.preview };
			button.classList.toggle(this._api.styles.settingsButtonActive);
			button.innerHTML = this._data.preview ? this._previewIcon.active : this._previewIcon.inactive;
			console.log('yoo', this._data);
		});

		return wrapper;
	}

	public wrap(pluginsContent: HTMLElement): HTMLElement {
		// if (this._data.preview) {
		const previewIcon = document.createElement('div');
		previewIcon.innerHTML = this._previewIcon.active;
		previewIcon.classList.add('preview');
		pluginsContent.appendChild(previewIcon);
		previewIcon.onclick = () => {
			this._data = { preview: false };
			previewIcon.style.display = 'none';
		};
		// }

		// wrapperIcon.style.display = this._data.preview ? 'block' : 'none';

		return pluginsContent;
	}

	public save(): BlockTuneData {
		return this._data;
	}

	// public prepare(): Promise<void> | void {
	// 	return undefined;
	// }
	//
	// public reset(): void | Promise<void> {
	// 	return undefined;
	// }
}
