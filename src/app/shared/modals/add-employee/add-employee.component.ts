import { Component,  ChangeDetectionStrategy } from '@angular/core';
import { UserInfo } from '@data/api/user-service/models/user-info';


@Component({
  selector: 'do-modal-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddEmployeeComponent {
	public positions: string[];
	public membersAll: any[];

  constructor() {

		this.positions = ['front', 'back', 'manager', 'lead'];
	  this.membersAll = [
		  { firstName: 'Vlad', lastName: 'Romanov', position: 'Front-End разработчик', department: 'Департамент Цифровых решений' },
		  { firstName: 'Vlad', lastName: 'Romanov', position: 'Front-End разработчик', department: 'Департамент Цифровых решений' },
		  { firstName: 'Vlad', lastName: 'Romanov', position: 'Front-End разработчик', department: 'Департамент Цифровых решений' },
		  { firstName: 'Vlad', lastName: 'Romanov', position: 'Front-End разработчик', department: 'Департамент Цифровых решений' },
		  { firstName: 'Vlad', lastName: 'Romanov', position: 'Front-End разработчик', department: 'Департамент Цифровых решений' },
		  { firstName: 'Vlad', lastName: 'Romanov', position: 'Front-End разработчик', department: 'Департамент Цифровых решений' },
		  { firstName: 'Vlad', lastName: 'Romanov', position: 'Front-End разработчик', department: 'Департамент Цифровых решений' },
		  { firstName: 'Vlad', lastName: 'Romanov', position: 'Front-End разработчик', department: 'Департамент Цифровых решений' },
		  { firstName: 'Vlad', lastName: 'Romanov', position: 'Front-End разработчик', department: 'Департамент Цифровых решений' },
		  { firstName: 'Vlad', lastName: 'Romanov', position: 'Front-End разработчик', department: 'Департамент Цифровых решений' },


	  ];
  };
}

