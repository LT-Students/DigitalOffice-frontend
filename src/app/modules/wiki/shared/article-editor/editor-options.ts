import { fromEvent } from 'rxjs';
import { first } from 'rxjs/operators';
import { EditorOptions } from '../../../tinymce-editor/types';

export const WIKI_EDITOR_OPTIONS: EditorOptions = {
	placeholder: 'Здесь вы можете ввести текст...',
	plugins: 'image',
	toolbar: 'undo redo | bold italic underline | image ',
	toolbar_mode: 'wrap',
	file_picker_types: 'image',
	/* and here's our custom image picker*/
	file_picker_callback: (cb, value, meta) => {
		const input = document.createElement('input');
		input.setAttribute('type', 'file');
		input.setAttribute('accept', 'image/*');

		fromEvent(input, 'change')
			.pipe(first())
			.subscribe((e) => {
				const file = ((e.target as HTMLInputElement).files as FileList)[0];
				const url = URL.createObjectURL(file);
				cb(url);
			});

		input.click();
	},
	images_upload_handler: (blobInfo, progress) =>
		new Promise((resolve, reject) => {
			alert('image uploaded!');
		}),
};
