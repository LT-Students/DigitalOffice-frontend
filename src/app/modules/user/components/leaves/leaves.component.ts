import { AfterViewChecked, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnChanges, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ModalService, ModalWidth } from "@app/services/modal.service";
import { LeaveTimeInfo } from "@data/api/time-service/models";
import { timeoutWith } from "rxjs/operators";
import { DeleteTaskComponent } from "../../modals/delete-task/delete-task.component";
import { EditLeaveComponent } from "../../modals/edit-leave/edit-leave.component";

// Заменить на модель, которую создал Рома
enum rusTypes {
    'Idle' = 'Отгул',
    'Vacation' = 'Отпуск',
    'Training' = 'Обучение',
    'SickLeave' = 'Больничный'
}

@Component({
    selector: 'do-leaves',
    templateUrl: './leaves.component.html',
    styleUrls: ['./leaves.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeavesComponent implements AfterViewChecked, OnChanges {
    @Input() leaves: LeaveTimeInfo[] | undefined | null;
    @ViewChild("comment") comment: ElementRef | undefined;

    public buttonShowed: boolean | undefined;
    public commentCollapsed: boolean | undefined;
    public commentCheckedFirstTime: boolean | undefined;
    public canEdit: boolean;

    constructor(
        private _modalService: ModalService,
        private _cdr: ChangeDetectorRef
    ) {
        this.leaves = [];
        this.canEdit = false;
    }

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

        // Если не вызвать, то не произойдёт ререндера и значение высоты элемента останется старым.
        this._cdr.detectChanges();
    }

    public checkComment() {
        if (this.commentCheckedFirstTime && this.comment?.nativeElement.offsetHeight > 50) {
            this.collapseComment();
            this.commentCheckedFirstTime = false;
            this.buttonShowed = true;
        }

        // Опять же, если не вызвать, высота элемента останется прежней.
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

    public getRusType(type: keyof typeof rusTypes): string {
        return rusTypes[type];
    }

    public openEditModal(leave: LeaveTimeInfo): void {
        this._modalService.openModal(EditLeaveComponent, ModalWidth.L, {
            id: leave.id,
            startTime: leave.startTime,
            endTime: leave.endTime,
            type: this.getRusType(leave.leaveType!).toLowerCase(),
            description: leave.comment,
            hours: leave.minutes! / 60
        }).afterClosed().subscribe((result: any) => {
            if (result?.status === 'FullSuccess') {
                leave.comment = result.data.comment;
                leave.startTime = result.data.startTime;
                leave.endTime = result.data.endTime;

                this._initComment();
                this.checkComment();
            }
        })
    }

    public openDeleteModal(leave: LeaveTimeInfo): void {
        this._modalService.openModal(DeleteTaskComponent, ModalWidth.M, {
            taskType: 'leave',
            name: this.getRusType(leave.leaveType!).toLowerCase(),
            date: new Date(leave.startTime!),
            id: leave.id
        }).afterClosed().subscribe((result: any) => {
            if (result?.status === 'FullSuccess') {
                const deletedIndex = this.leaves?.findIndex(leave => leave.id === result.data.id);
                if (deletedIndex) {
                    this.leaves?.splice(deletedIndex, 1);
                    this._cdr.detectChanges();
                }
            }
        })
    }
}