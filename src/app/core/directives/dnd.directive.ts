import { Directive, HostBinding, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
	selector: '[doDnd]',
})
export class DndDirective {
	@HostBinding('class.fileover') fileOver: boolean;
	@Output() fileDropped: EventEmitter<any>;

	constructor() {
		this.fileOver = false;
		this.fileDropped = new EventEmitter<any>()
	}

	// Dragover listener
	@HostListener('dragover', ['$event']) onDragOver(evt: Event) {
		evt.preventDefault();
		evt.stopPropagation();
		this.fileOver = true;
	}

	// Dragleave listener
	@HostListener('dragleave', ['$event']) public onDragLeave(evt: Event) {
		evt.preventDefault();
		evt.stopPropagation();
		this.fileOver = false;
	}

	// Drop listener
	@HostListener('drop', ['$event']) public ondrop(evt: DragEvent) {
		evt.preventDefault();
		evt.stopPropagation();
		this.fileOver = false;
		let files = evt.dataTransfer?.files;
		if (files && files.length > 0) {
			this.fileDropped.emit(files);
		}
	}
}
