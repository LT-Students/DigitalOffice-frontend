import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewContainerRef } from '@angular/core';
import { CommunicationInfo } from '@api/user-service/models/communication-info';
import { DialogService, ModalWidth } from '@app/services/dialog.service';
import { OperationResultResponse } from '@api/user-service/models/operation-result-response';
import { CommunicationService } from '@app/services/user/communication.service';
import { switchMap } from 'rxjs/operators';
import { EMPTY, iif } from 'rxjs';
import { Clipboard } from '@angular/cdk/clipboard';
import { ConfirmDialogData } from '@shared/modals/confirm-dialog/confirm-dialog.component';
import { AlertService } from '@app/services/alert.service';
import { Icons } from '@shared/modules/icons/icons';
import { EmployeePageService } from '../../../services/employee-page.service';
import { AddContactComponent } from './add-contact/add-contact.component';
import { EditContactComponent } from './edit-contact/edit-contact.component';

@Component({
	selector: 'do-communications',
	templateUrl: './communications.component.html',
	styleUrls: ['./communications.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommunicationsComponent implements OnInit {
	public readonly Icons = Icons;
	public communications: CommunicationInfo[];
	public employeeId: string;
	public emailContactCount: number;

	constructor(
		private _employeePageService: EmployeePageService,
		private _modalService: DialogService,
		private _cdr: ChangeDetectorRef,
		private _communicationService: CommunicationService,
		private alert: AlertService,
		private _clipboard: Clipboard,
		private viewContainerRef: ViewContainerRef
	) {
		this.communications = [];
		this.employeeId = '';
		this.emailContactCount = 0;
	}

	public ngOnInit(): void {
		this._employeePageService.selectedUser$.subscribe((user) => {
			this.communications = this._mapCommunications(user.communications ?? []);
			this.employeeId = user.id ?? '';
			this.communications.sort((contact1, contact2) => this._communicationCompareFn(contact1, contact2));
			this._cdr.markForCheck();
		});
	}

	public onCommunicationClick(contact: CommunicationInfo): void {
		const copied: boolean = this._clipboard.copy(contact.value ?? '');
		if (copied) {
			this.alert.open('Контакт скопирован в буфер обмена');
		}
	}

	public onAddClick(): void {
		this._modalService
			.open<OperationResultResponse>(AddContactComponent, {
				width: ModalWidth.M,
				data: this.employeeId,
				viewContainerRef: this.viewContainerRef,
			})
			.afterClosed()
			.subscribe((result) => {
				this._getCommunications();
			});
	}

	public onEditClick(contact: CommunicationInfo, event: MouseEvent): void {
		event.stopPropagation();

		const modalContentConfig: CommunicationInfo = {
			...contact,
			value: contact.type === 'Twitter' || contact.type === 'Telegram' ? contact.value?.slice(1) : contact.value,
		};

		this._modalService
			.open<{ response: OperationResultResponse; value: string }>(EditContactComponent, {
				width: ModalWidth.M,
				data: modalContentConfig,
				viewContainerRef: this.viewContainerRef,
			})
			.afterClosed()
			.subscribe((result) => {
				if (result) {
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
				switchMap((confirmResult) => {
					return iif(
						() => !!confirmResult,
						this._communicationService.removeCommunication({ communicationId: contact.id ?? '' }),
						EMPTY
					);
				})
			)
			.subscribe((result) => {
				this._getCommunications();
			});
	}

	private _getCommunications(): void {
		this._employeePageService.getEmployee(this.employeeId).subscribe((user) => {
			this.communications = this._mapCommunications(user.communications ?? []);
			this.communications.sort((contact1, contact2) => this._communicationCompareFn(contact1, contact2));
			this._cdr.markForCheck();
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

	private _mapCommunications(communications: CommunicationInfo[]): CommunicationInfo[] {
		this.emailContactCount = 0;

		return communications?.map((contact) => {
			const mappedContact = { ...contact };
			if (mappedContact.type === 'Phone') {
				mappedContact.value = '+' + mappedContact.value;
			}
			this.emailContactCount++;
			return mappedContact;
		});
	}
}
