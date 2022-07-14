import { Injectable } from '@angular/core';
import { CommunicationApiService } from '@api/user-service/services/communication-api.service';
import { CommunicationType } from '@api/user-service/models/communication-type';
import { pipe } from 'rxjs';
import { DialogService, ModalWidth } from '@app/services/dialog.service';
import { CommunicationInfo } from '@api/user-service/models/communication-info';
import { first, switchMap } from 'rxjs/operators';
import { User } from '@app/models/user/user.model';
import { EditContactComponent } from '../edit-contact/edit-contact.component';
import { AddContactComponent } from '../add-contact/add-contact.component';
import { EmployeePageService } from '../../../services/employee-page.service';

@Injectable()
export class ManageCommunicationsService {
	constructor(
		private communicationApi: CommunicationApiService,
		private dialog: DialogService,
		private employeePage: EmployeePageService
	) {}

	public createCommunication(): void {
		this.employeePage.selectedUser$
			.pipe(
				first(),
				switchMap((user: User) =>
					this.dialog
						.open(AddContactComponent, {
							width: ModalWidth.M,
							data: user.id,
						})
						.afterClosed()
				),
				this.updateCommunications()
			)
			.subscribe();
	}

	public editCommunicationValue(communication: CommunicationInfo): void {
		this.dialog
			.open(EditContactComponent, { width: ModalWidth.M, data: communication })
			.afterClosed()
			.pipe(this.updateCommunications())
			.subscribe();
	}

	public transformToBaseEmail(communication: CommunicationInfo): void {
		const data = {
			title: 'Сделать почту основной',
			message: `Базовая электронная почта используется для уведомлений от системы, а также для восстановления доступа и смены пароля.\n\nСделать ${communication.value} базовой?`,
			confirmText: 'Всё понятно!',
			action$: this.communicationApi.editCommunication({
				communicationId: communication.id,
				body: { type: CommunicationType.BaseEmail },
			}),
		};

		this.dialog.confirm(data).afterClosed().pipe(this.updateCommunications()).subscribe();
	}

	public resendBaseConfirmation(communication: CommunicationInfo): void {
		const data = {
			title: 'Подтверждение почты',
			message: `На адрес <span class="text-accent_controls_default">${communication.value}</span> выслана ссылка для подтверждения почты.\n\nОна будет действительна в течение 30 минут.`,
			buttonText: 'Всё понятно!',
		};

		this.dialog.info(data);
		this.communicationApi.resendConfirmationCommunication({ communicationId: communication.id }).subscribe();
	}

	public deleteCommunication(communication: CommunicationInfo): void {
		this.dialog
			.confirm({
				title: 'Удаление контакта',
				confirmText: 'Удалить',
				message: 'Вы действительно хотите удалить контакт?',
				action$: this.communicationApi.removeCommunication({ communicationId: communication.id }),
			})
			.afterClosed()
			.pipe(this.updateCommunications())
			.subscribe();
	}

	private updateCommunications() {
		return pipe(switchMap(() => this.employeePage.refreshSelectedUser()));
	}
}
