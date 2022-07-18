import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { IconPaths } from '@shared/modules/icons/icons';

@NgModule({
	declarations: [],
	imports: [CommonModule],
})
export class IconsModule {
	constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
		for (const [name, path] of Object.entries(IconPaths)) {
			iconRegistry.addSvgIcon(name, sanitizer.bypassSecurityTrustResourceUrl(path));
		}
	}
}
