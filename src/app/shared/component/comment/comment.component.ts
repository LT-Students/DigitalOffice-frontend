import { Component, ElementRef, ViewChild, OnChanges, AfterViewChecked, ChangeDetectionStrategy, ChangeDetectorRef, Input } from "@angular/core";

@Component({
    selector: 'do-comment',
    templateUrl: 'comment.component.html',
    styleUrls: ['comment.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentComponent implements OnChanges, AfterViewChecked {
    @ViewChild('comment') public comment: ElementRef | undefined
    @Input() public text: string | undefined | null;

    public buttonShowed: boolean;
    public commentCollapsed: boolean;
    public commentCheckedFirstTime: boolean;

    constructor(
        private _cdr: ChangeDetectorRef
    ) {
        this.buttonShowed = false;
        this.commentCollapsed = false;
        this.commentCheckedFirstTime = true;
    }

    public ngOnChanges() {
        this._initComment();
    }

    public ngAfterViewChecked() {
        this.checkComment();
    }

    private _initComment() {
        this.comment?.nativeElement.classList.remove('comment__content_collapsed')
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

        // Если не вызывать, высота элемента останется прежней.
        this._cdr.detectChanges();
    }

    public collapseComment() {
        this.commentCollapsed = true;
        this.comment?.nativeElement.classList.add('comment__content_collapsed')
    }

    public expandComment() {
        this.commentCollapsed = false;
        this.comment?.nativeElement.classList.remove('comment__content_collapsed')
    }
}