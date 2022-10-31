import { NgModule } from '@angular/core';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { EditorComponent } from './editor.component';

@NgModule({
	declarations: [EditorComponent],
	imports: [EditorModule],
	exports: [EditorComponent],
	providers: [{ provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }],
})
export class TinymceEditorModule {}
