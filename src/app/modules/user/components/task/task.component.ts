import { AfterViewChecked, Component, ElementRef, Input, OnChanges, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { TimeService } from "@app/services/time/time.service";
import { WorkTimeApiService } from "@data/api/time-service/services";
import { DeleteTaskComponent } from "../../modals/delete-task/delete-task.component";
import { Task } from "../user-tasks/user-tasks.component";

interface Date {
    day: number,
    month: number,
    year: number
}

@Component({
    selector: 'do-task',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.scss']
})
export class TaskComponent implements AfterViewChecked, OnChanges {
    @Input() task: Task;
    @Input() canEdit: boolean;
    @ViewChild('description', { read: ElementRef, static: true }) descriptionRef: ElementRef;

    public descriptionOpened: boolean;
    public descriptionIsHuge: boolean;
    public editMode: boolean;

    public startTime: Date;
    public endTime: Date;

    public taskInfoForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private dialog: MatDialog,
        private _timeService: TimeService
    ) {
        this.descriptionOpened = false;
        this.descriptionIsHuge = false;
        this.editMode = false;
        this._initEditForm();
    }

    public ngOnChanges() {
        this.getPeriod()
    }

    public getPeriod() {
        const startDate = new Date(this.task.startTime);
        const endDate = new Date(this.task.endTime);

        this.startTime = {
            day: startDate.getUTCDate(),
            month: startDate.getUTCMonth(),
            year: startDate.getUTCFullYear()
        }
        this.endTime = {
            day: endDate.getUTCDate(),
            month: endDate.getUTCMonth(),
            year: endDate.getUTCFullYear()
        }
    }

    // Не очень нравится мне этот вариант, но пока что без него после возвращения из формы редактирования описание становится
    // раскрытым.
    ngAfterViewChecked() {
        if (this.descriptionRef?.nativeElement.offsetHeight >= 65) {
            this.descriptionIsHuge = true;
            this.descriptionRef.nativeElement.classList.add('task__description-partial')
        }
    }

    onShowDescriptionClick() {
        this.descriptionOpened = !this.descriptionOpened;
    }

    public onReset() {
        this.taskInfoForm.reset();
        this.toggleEditMode();
    }

    public onSubmit() {
        const title = this.taskInfoForm.get('title').value;
        const minutes = this.taskInfoForm.get('minutes').value;
        const description = this.taskInfoForm.get('description').value;

        this._timeService.editWorkTime({
            workTimeId: this.task.id,
            body: [{
                op: 'replace',
                path: '/Description',
                value: this.taskInfoForm.get('description').value
            },
            {
                op: 'replace',
                path: '/Minutes',
                value: this.taskInfoForm.get('minutes').value
            },
            {
                op: 'replace',
                path: '/Title',
                value: this.taskInfoForm.get('title').value
            }
            ]
        }).subscribe(res => {
            if (res.status === 'FullSuccess') {
                this.task = {
                    ...this.task,
                    title,
                    minutes,
                    description
                }
            }
        })

        this.toggleEditMode();
    }

    public toggleEditMode() {
        this.fillForm();
        this.editMode = !this.editMode;
    }

    public fillForm() {
        const title = this.task.title ? this.task.title : '';
        const minutes = this.task.minutes ? this.task.minutes : '';
        const description = this.task.description ? this.task.description : '';

        this.taskInfoForm.patchValue({
            title,
            minutes,
            description
        });
    }

    private _initEditForm() {
        this.taskInfoForm = this.fb.group({
            title: ['', Validators.required],
            minutes: ['', Validators.required],
            description: ['']
        })
    }


    public openDeleteModal() {
        this.dialog.open(DeleteTaskComponent, { autoFocus: false }).afterClosed().subscribe(result => {
            if (result.deleted) {
                console.log('[ДАННЫЕ УДАЛЕНЫ]')
            }
        })
    }
}