//@ts-nocheck
import Header from '@editorjs/header';
import Image from '@editorjs/image';

export const editorjsConfig = {
	holder: 'editorjs',
	tools: {
		header: {
			class: Header,
			inlineToolbar: ['link', 'bold', 'italic'],
		},
		image: {
			class: Image,
			config: {
				endpoints: {
					byFile: 'http://localhost:8008/uploadFile',
				},
				uploadByFile(file) {
					return;
				},
			},
		},
	},
};
