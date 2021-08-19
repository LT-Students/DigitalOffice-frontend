import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

import { mappedProject } from "../../components/user-tasks/user-tasks.component";
import { TimeService } from '@app/services/time/time.service';

@Component({
    selector: 'do-edit-project',
    templateUrl: './edit-project.component.html',
    styleUrls: ['./edit-project.component.scss']
})
export class EditProjectComponent {
    public editForm: FormGroup;
    public projectDate: Date;

    constructor(
        @Inject(MAT_DIALOG_DATA) public project: {
            id: string,
            name: string,
            userHours: number,
            managerHours: number,
            description: string,
            month: number,
            year: number
        },
        private _fb: FormBuilder,
        private _dialogRef: MatDialogRef<EditProjectComponent>,
        private _timeService: TimeService
    ) {
        console.log("В КОНСТРУКТОРЕ: ", this.project)
        this.editForm = this._initFormGroup();
        this.projectDate = new Date(this.project.year, this.project.month - 1)
    }

    private _initFormGroup(): FormGroup {
        return this._fb.group({
            userHours: [this.project.userHours as Number, [Validators.required]],
            managerHours: [this.project.managerHours as Number, [Validators.required]],
            description: [this.project.description]
        })
    }

    public onSubmitClick(): void {
        this._timeService.editWorkTime({
            workTimeId: this.project.id,
            body: [
                {
                    op: 'replace',
                    path: '/Description',
                    value: this.editForm.get('description')?.value
                },
                {
                    op: 'replace',
                    path: '/UserHours',
                    value: this.editForm.get('userHours')?.value
                },
                {
                    op: 'replace',
                    path: '/ManagerHours',
                    value: this.editForm.get('managerHours')?.value
                }
            ]
        }).subscribe((res) => {
            console.log(res)
            this._dialogRef.close({
                status: res.status,
                data: {
                    description: this.editForm.get('description')?.value,
                    userHours: this.editForm.get('userHours')?.value,
                    managerHours: this.editForm.get('managerHours')?.value
                }
            });
        })
    }

    public onCancelClick(): void {
        this._dialogRef.close({
            status: '',
            data: {}
        });
    }
}