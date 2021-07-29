import { AfterViewChecked, AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";

@Component({
    selector: 'do-task',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.scss']
})
export class TaskComponent implements AfterViewInit {
    @Input() task;
    @ViewChild('description', { read: ElementRef }) description: ElementRef;

    public descriptionOpened: boolean;
    public descriptionIsHuge: boolean;

    constructor() {
        this.descriptionOpened = false;
        this.descriptionIsHuge = false;
    }

    ngAfterViewInit() {
        if (this.description.nativeElement.offsetHeight >= 65) {
            this.descriptionIsHuge = true;
            this.description.nativeElement.classList.add('task__description-partial')
        }
    }

    toggleDescription() {
        if (this.description.nativeElement.classList[0] === 'task__description-partial') {
            this.description.nativeElement.classList.remove('task__description-partial');
            this.description.nativeElement.classList.add('task__description-full');
        }
        else {
            this.description.nativeElement.classList.remove('task__description-full');
            this.description.nativeElement.classList.add('task__description-partial');
        }
    }

    onShowDescriptionClick() {
        this.descriptionOpened = !this.descriptionOpened;
        this.toggleDescription();
    }
}