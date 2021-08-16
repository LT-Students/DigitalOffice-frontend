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
export class EditProjectComponent implements OnInit {
    public editForm: FormGroup;
    public projectDate: Date;

    constructor(
        @Inject(MAT_DIALOG_DATA) public project: {
            id: string,
            name: string,
            hours: string,
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

    ngOnInit() {
        //this.editForm = this._initFormGroup();
    }

    private _initFormGroup(): FormGroup {
        return this._fb.group({
            hours: [this.project.hours, [Validators.required]],
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
                // {
                //     op: 'replace',
                //     path: '/UserHours',
                //     value: this.editForm.get('hours')?.value
                // }
            ]
        }).subscribe((res) => {
            console.log(res);
        })
    }

    public onCancelClick(): void {
        this._dialogRef.close();
    }
}