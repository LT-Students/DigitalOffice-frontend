import { NgModule } from '@angular/core';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { SharedModule } from '@shared/shared.module';
import { EditorComponent } from './editor.component';

@NgModule({
	declarations: [EditorComponent],
	imports: [SharedModule, EditorModule],
	exports: [EditorComponent],
	providers: [{ provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }],
})
export class TinymceEditorModule {}
