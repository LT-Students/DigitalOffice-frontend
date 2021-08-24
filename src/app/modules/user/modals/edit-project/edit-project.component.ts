import { Component, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

import { IMappedProject } from "../../components/user-tasks/user-tasks.component";
import { TimeService } from '@app/services/time/time.service';
import { IDialogResponse } from "../../components/user-tasks/user-tasks.component";
import { OperationResultResponse } from "@data/api/time-service/models/operation-result-response";
import { OperationResultStatusType } from "@data/api/time-service/models";

@Component({
    selector: 'do-edit-project',
    templateUrl: './edit-project.component.html',
    styleUrls: ['./edit-project.component.scss']
})
export class EditProjectComponent {
    public editForm: FormGroup;
    public projectDate: Date;

    constructor(
        @Inject(MAT_DIALOG_DATA) public project: IMappedProject,
        private _fb: FormBuilder,
        private _dialogRef: MatDialogRef<EditProjectComponent, IDialogResponse>,
        private _timeService: TimeService
    ) {
        this.editForm = this._initFormGroup();
        this.projectDate = new Date(this.project.year, this.project.month - 1)
    }

    private _initFormGroup(): FormGroup {
        return this._fb.group({
            userHours: [this.project.userHours, [Validators.required]],
            managerHours: [this.project.managerHours, [Validators.required]],
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
        }).subscribe((res: OperationResultResponse) => {
            if (res.status === OperationResultStatusType.FullSuccess) {
                this.onClose({
                    status: res.status,
                    data: {
                        description: this.editForm.get('description')?.value,
                        userHours: this.editForm.get('userHours')?.value,
                        managerHours: this.editForm.get('managerHours')?.value
                    }
                })
            }
        })
    }

    public onClose(params?: IDialogResponse): void {
        this._dialogRef.close(params);
    }
}