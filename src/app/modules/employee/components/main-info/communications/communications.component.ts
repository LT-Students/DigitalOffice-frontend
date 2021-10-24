import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { EmployeePageService } from '@app/services/employee-page.service';
import { CommunicationInfo } from '@data/api/user-service/models/communication-info';
import { ModalService, ModalWidth } from '@app/services/modal.service';
import { OperationResultResponse } from '@data/api/user-service/models/operation-result-response';
import { OperationResultStatusType } from '@data/api/user-service/models/operation-result-status-type';
import { CommunicationService } from '@app/services/user/communication.service';
import { CommunicationType } from '@data/api/user-service/models/communication-type';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ConfirmDialogData } from '../../../../../shared/modals/confirm-dialog/confirm-dialog.component';
import { AddContactComponent } from './add-contact/add-contact.component';
import { EditContactComponent } from './edit-contact/edit-contact.component';

@Component({
	selector: 'do-communications',
	templateUrl: './communications.component.html',
	styleUrls: ['./communications.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommunicationsComponent implements OnInit {
	@Input() public mainInfoEditing: boolean;
	public communications: CommunicationInfo[];
	public employeeId: string;
	public emailContactCount: number;

	constructor(
		private _employeePageService: EmployeePageService,
		private _modalService: ModalService,
		private _cdr: ChangeDetectorRef,
		private _communicationService: CommunicationService,
		private _snackBar: MatSnackBar
	) {
		this.mainInfoEditing = false;
		this.communications = [];
		this.employeeId = '';
		this.emailContactCount = 0;
	}

	public ngOnInit(): void {
		this._employeePageService.selectedUser$.subscribe((user) => {
			this.communications = user.communications ?? [];
			this.employeeId = user.id ?? '';
			this._countEmailContacts();
			this.communications.sort((contact1, contact2) => this._communicationCompareFn(contact1, contact2));
			this._cdr.markForCheck();
		});
	}

	public onCommunicationClick(contact: CommunicationInfo): void {
		navigator.clipboard.writeText(contact.value ?? '').then(() => {
			this._snackBar.open('Контакт скопирован в буфер обмена', 'x', { duration: 3000 });
		});
	}

	public onAddClick(): void {
		this._modalService
			.openModal<AddContactComponent, string, OperationResultResponse>(
				AddContactComponent,
				ModalWidth.M,
				this.employeeId
			)
			.afterClosed()
			.subscribe((result) => {
				if (result?.status === OperationResultStatusType.FullSuccess) {
					this._getCommunications();
				}
			});
	}

	public onEditClick(contact: CommunicationInfo, event: MouseEvent): void {
		event.stopPropagation();
		this._modalService
			.openModal<EditContactComponent, CommunicationInfo, { response: OperationResultResponse; value: string }>(
				EditContactComponent,
				ModalWidth.M,
				contact
			)
			.afterClosed()
			.subscribe((result) => {
				if (result?.response.status === OperationResultStatusType.FullSuccess) {
					contact.value = result.value;
					this._cdr.markForCheck();
				}
			});
	}

	public onDeleteClick(contact: CommunicationInfo, event: MouseEvent): void {
		event.stopPropagation();

		const confirmDialogData: ConfirmDialogData = {
			confirmText: 'Да, удалить',
			message: `Вы действительно хотите удалить ${contact.type} ${contact.value}?`,
			title: `Удаление ${contact.type}`,
		};

		this._modalService
			.confirm(confirmDialogData)
			.afterClosed()
			.pipe(
				catchError((err) => {
					const errorMessage: string = err.error?.errors ? err.error.errors[0] : 'Что-то пошло не так :(';
					this._snackBar.open(errorMessage, 'x', { duration: 3000 });
					return throwError(err);
				})
			)
			.subscribe((confirmResult) => {
				if (confirmResult) {
					this._communicationService
						.removeCommunication({ communicationId: contact.id ?? '' })
						.subscribe((result) => {
							if (result.status === OperationResultStatusType.FullSuccess) {
								this._getCommunications();
							}
						});
				}
			});
	}

	private _getCommunications(): void {
		this._employeePageService.getEmployee(this.employeeId).subscribe((user) => {
			this.communications = user.communications ?? [];
			this._countEmailContacts();
			this.communications.sort((contact1, contact2) => this._communicationCompareFn(contact1, contact2));
			this._cdr.markForCheck();
		});
	}

	private _countEmailContacts(): void {
		this.emailContactCount = 0;
		this.communications.forEach((communication) => {
			if (communication.type === CommunicationType.Email) this.emailContactCount++;
		});
	}

	private _communicationCompareFn(contact1: CommunicationInfo, contact2: CommunicationInfo): number {
		if (contact1.type === contact2.type) {
			return 0;
		}

		if (contact1.type === 'Email' && contact2.type !== 'Email') {
			return -1;
		}

		if (contact1.type && contact2.type && contact1.type < contact2.type) {
			return -1;
		}

		if (contact1.type && contact2.type && contact1.type > contact2.type) {
			return 1;
		}

		return 0;
	}
}
