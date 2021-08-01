import { AfterViewChecked, AfterViewInit, Component, ElementRef, Input, ViewChild } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ModalService } from "@app/services/modal.service";
import { WorkTimeApiService } from "@data/api/time-service/services";
import { DeleteTaskComponent } from "../../modals/delete-task/delete-task.component";

@Component({
    selector: 'do-task',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.scss']
})
export class TaskComponent implements AfterViewChecked {
    @Input() task;
    @ViewChild('description', { read: ElementRef }) descriptionRef: ElementRef;

    public descriptionOpened: boolean;
    public descriptionIsHuge: boolean;
    public editMode: boolean;

    public taskInfoForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private modalService: ModalService,
        private dialog: MatDialog,
        private _workTimeService: WorkTimeApiService
    ) {
        this.descriptionOpened = false;
        this.descriptionIsHuge = false;
        this.editMode = false;
        this._initEditForm();
    }

    // Не очень нравится мне этот вариант, но пока что без него после возвращения из формы редактирования описание становится
    // раскрытым.
    ngAfterViewChecked() {
        // console.log(this.task)
        // console.log("CHECKED!!!!")
        if (this.descriptionRef?.nativeElement.offsetHeight >= 65) {
            this.descriptionIsHuge = true;
            this.descriptionRef.nativeElement.classList.add('task__description-partial')
        }
    }

    onShowDescriptionClick() {
        this.descriptionOpened = !this.descriptionOpened;
    }

    public toggleEditMode() {
        console.log('Opened: ', this.descriptionOpened);
        this.fillForm();
        this.editMode = !this.editMode;
    }

    public fillForm() {
        console.log('task: ', this.task);
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
            description: ['', Validators.required]
        })
    }

    public onSubmit() {
        console.log('SUBMITTED');
        console.log(this.task.id);
        console.log(this.taskInfoForm.get('description').value)
        this._workTimeService.editWorkTime({
            workTimeId: this.task.id,
            body: [{
                op: 'replace',
                path: '/Description',
                value: this.taskInfoForm.get('description').value
            }]
        }).subscribe(res => {
            console.log('RESULT: ', res)
        })

        this.toggleEditMode();
    }

    public openDeleteModal() {
        this.dialog.open(DeleteTaskComponent, { autoFocus: false }).afterClosed().subscribe(result => {
            if (result.deleted)
                console.log('[ДАННЫЕ УДАЛЕНЫ]')
        })
        //this.modalService.openModal(DeleteTaskComponent, null, { autofocus: false }).afterClosed();
    }
}