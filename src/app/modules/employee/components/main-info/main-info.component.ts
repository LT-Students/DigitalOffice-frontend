import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IUser } from '@data/models/user';
import { ConnectionType } from '@data/api/user-service/models/connection-type';

interface ExtendedUser extends IUser {
  emojiStatus: { emoji: string; description: string };
  about: string;
  photoUrl: string;
  jobPosition: string;
  department: string;
  location: string;
  office: string;
  workingRate: number;
  workingHours: { startAt: string; endAt: string };
  workingSince: Date;
  birthDate: Date;
  email: string,
  phone: string,
  telegram: string,
  vacationDaysLeft: number;
  vacationSince: Date;
  vacationUntil: Date;
}

@Component({
  selector: 'do-employee-page-main-info',
  templateUrl: './main-info.component.html',
  styleUrls: ['./main-info.component.scss'],
})
export class MainInfoComponent implements OnInit {
  public pageId: string;

  public employeeInfoForm: FormGroup;
  public employee: ExtendedUser;

  public selectOptions;

  public isEditing: boolean;
  public previewPhoto: string;

  constructor(private fb: FormBuilder, private route: ActivatedRoute) {
    this.employee = {
      id: '0',
      firstName: 'Ангелина',
      lastName: 'Иванова',
      middleName: 'Анатольевна',
      photoUrl: 'assets/images/employee-photo.png',
      emojiStatus: { emoji: '🏠', description: 'На больничном' },
      about: 'С удовольствием отвечу на ваши вопросы, но только в рабочее время! Всем хорошего дня!',
      jobPosition: 'Middle Product Manager',
      department: 'Департамент цифровых технологий',
      location: 'Россия, г. Санкт-Петербург',
      office: 'м. Чернышевская',
      workingRate: 0.75,
      // TODO: переделать на Time object
      workingHours: {
        startAt: '10:00',
        endAt: '19:00',
      },
      workingSince: new Date(2017, 9),
      birthDate: new Date(1995, 9, 10),
      email: 'evet.pm@lanit-tercom.com',
      phone: '+7(921)623-25-92',
      telegram: '@eve01beast',
      vacationDaysLeft: 20,
      vacationSince: new Date(2020, 9, 10),
      vacationUntil: new Date(2020, 9, 20),
      isAdmin: true,
    };

    this.selectOptions = {
      jobPosition: ['Middle Product Manager', 'Senior Product Manager'],
      department: ['Департамент цифровых технологий', 'Департамент мопсиков'],
      office: ['м. Чернышевская', 'м. Площадь Восстания'],
      emojiStatus: [
        { emoji: '🏠', description: 'Работает из дома' },
        { emoji: '🏖', description: 'В отпуске' },
      ],
      workingHours: ['8:00', '9:00', '10:00', '16:00', '17:00', '19:00'],
    };

    this.isEditing = false;
    this.previewPhoto = this.employee.photoUrl;

    this.employeeInfoForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      middleName: [''],
      photo: [''],
      emojiStatus: [''],
      aboutMe: [''],
      jobPosition: ['', Validators.required],
      department: ['', Validators.required],
      location: ['', Validators.required],
      office: ['', Validators.required],
      workingRate: ['', Validators.required],
      workingHours: this.fb.group({
        startAt: [''],
        endAt: [''],
      }),
      workingSince: [''],
      birthDate: [''],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      telegram: [''],
      vacationSince: ['', Validators.required],
      vacationUntil: ['', Validators.required],
      vacationDays: ['', Validators.required],
    });
    this.fillForm();

    this.pageId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {}

  get fullName() {
    const { lastName, firstName, middleName } = this.employee;
    return `${lastName} ${firstName} ${middleName}`;
  }

  get workingHours() {
    const { startAt, endAt } = this.employee.workingHours;
    return `${startAt}-${endAt}`;
  }

  isOwner() {
    return this.employee.id === this.pageId;
  }

  isVisitor() {
    return this.employee.isAdmin || this.isOwner();
  }

  toggleEditMode() {
    this.isEditing = !this.isEditing;
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (evt) => {
        this.employeeInfoForm.patchValue({
          photo: evt.target.result,
        });
        this.previewPhoto = <string>evt.target.result;
      };
    }
  }

  updateEmployeeInfo() {
    this.employee = { ...this.employee, ...this.employeeInfoForm.value };
  }

  onSubmit() {
    this.updateEmployeeInfo();
    this.toggleEditMode();
  }

  onReset() {
    this.toggleEditMode();
  }

  fillForm() {
    this.employeeInfoForm.patchValue(this.employee);
  }

  compareEmoji(option, value) {
    return option.emoji === value.emoji;
  }

  changeWorkingRate(step) {
    const currentValue = this.employeeInfoForm.get('workingRate').value;
    const rate = +currentValue + step;
    this.employeeInfoForm.patchValue({ workingRate: rate });
  }

  /* TODO: добавить обработчик перевода Эмодзи-статуса в "В отпуске"*/
}
