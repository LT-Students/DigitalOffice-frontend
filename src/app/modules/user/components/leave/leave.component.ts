import { AfterViewChecked, ViewChild } from "@angular/core";
import { Component, ElementRef, Input, OnChanges } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { TimeService } from "@app/services/time/time.service";
import { LeaveTimeInfo } from "@data/api/time-service/models";
import { DeleteTaskComponent } from "../../modals/delete-task/delete-task.component";

interface Date {
    day: number,
    month: number,
    year: number
}

@Component({
    selector: 'do-leave',
    templateUrl: './leave.component.html',
    styleUrls: ['./leave.component.scss']
})
export class LeaveComponent /*implements OnChanges, AfterViewChecked*/ {
    // @Input() leave: LeaveTimeInfo | null;
    // @Input() canEdit: boolean;
    // @ViewChild('description', { read: ElementRef, static: true }) descriptionRef: ElementRef | null;

    // public startTime: Date | null;
    // public endTime: Date | null;

    // public editMode: boolean;
    // public descriptionIsHuge: boolean;
    // public descriptionOpened: boolean;

    // public leaveInfoForm: FormGroup | null;

    // constructor(
    //     private _fb: FormBuilder,
    //     private _dialog: MatDialog,
    //     private _timeService: TimeService
    // ) {
    //     this.descriptionOpened = false;
    //     this.descriptionIsHuge = false;
    //     this.editMode = false;
    //     this.leave = null;
    //     this.canEdit = false;
    //     this.startTime = null;
    //     this.endTime = null;
    //     this.descriptionRef = null;
    //     this.leaveInfoForm = this._initEditForm();
    // }

    // public ngOnChanges() {
    //     this.getPeriod()
    // }

    // public ngAfterViewChecked() {
    //     if (this.descriptionRef?.nativeElement.offsetHeight >= 65) {
    //         this.descriptionIsHuge = true;
    //         this.descriptionRef?.nativeElement.classList.add('task__description-partial')
    //     }
    // }

    // public onReset() {
    //     this.leaveInfoForm?.reset();
    //     this.toggleEditMode();
    // }

    // public onSubmit() {
    //     // Редактируем только Vacation и Training
    //     if (this.leave?.leaveType === 'Vacation' || this.leave?.leaveType === 'Training') {
    //         console.log('[О, да вы отредактировали Vacation или Training]')
    //     }
    //     // Редактируем Idle и  SickLeave
    //     else {
    //         console.log('[О, да вы отредактировали Idle или SickLeave]')
    //     }

    //     this.toggleEditMode();
    // }

    // public getPeriod() {
    //     //const startDate = new Date(this.leave.startTime);
    //     //const endDate = new Date(this.leave.endTime);

    //     // this.startTime = {
    //     //     day: startDate.getUTCDate(),
    //     //     month: startDate.getUTCMonth(),
    //     //     year: startDate.getUTCFullYear()
    //     // }
    //     // this.endTime = {
    //     //     day: endDate.getUTCDate(),
    //     //     month: endDate.getUTCMonth(),
    //     //     year: endDate.getUTCFullYear()
    //     // }
    // }

    // public onShowDescriptionClick() {
    //     console.log('onShowDescriptionClick')
    // }

    // public toggleEditMode() {
    //     this.editMode = !this.editMode;
    // }

    // public openDeleteModal() {
    //     this._dialog.open(DeleteTaskComponent).afterClosed().subscribe(result => {
    //         console.log('[ДАННЫЕ УДАЛЕНЫ]', result)
    //     })
    // }

    // private _initEditForm(): FormGroup {
    //     return this._fb.group({
    //         minutes: ['', Validators.required],
    //         description: ['']
    //     })
    // }
}