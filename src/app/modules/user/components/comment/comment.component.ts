import { Input } from "@angular/core";
import { Component, ElementRef, Output, ViewChild, EventEmitter, OnChanges, AfterViewChecked, ChangeDetectionStrategy, ChangeDetectorRef } from "@angular/core";

@Component({
    selector: 'do-comment',
    templateUrl: 'comment.component.html',
    styleUrls: ['comment.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentComponent implements OnChanges, AfterViewChecked {
    @ViewChild('comment') public comment: ElementRef | undefined
    @Input() public text: string | undefined;

    public buttonShowed: boolean | undefined;
    public commentCollapsed: boolean | undefined;
    public commentCheckedFirstTime: boolean | undefined;

    constructor(
        private _cdr: ChangeDetectorRef
    ) { }

    public ngOnChanges() {
        this._initComment();
    }

    public ngAfterViewChecked() {
        this.checkComment();
    }

    private _initComment() {
        this.comment?.nativeElement.classList.remove('cell__text_collapsed')
        this.commentCollapsed = false;
        this.commentCheckedFirstTime = true;
        this.buttonShowed = false;
    }

    public checkComment() {
        if (this.commentCheckedFirstTime && this.comment?.nativeElement.offsetHeight > 50) {
            this.collapseComment();
            this.commentCheckedFirstTime = false;
            this.buttonShowed = true;
        }

        // Опять же, если не вызывать, высота элемента останется прежней.
        this._cdr.detectChanges();
    }

    public collapseComment() {
        this.commentCollapsed = true;
        this.comment?.nativeElement.classList.add('cell__text_collapsed')
    }

    public expandComment() {
        this.commentCollapsed = false;
        this.comment?.nativeElement.classList.remove("cell__text_collapsed")
    }
}