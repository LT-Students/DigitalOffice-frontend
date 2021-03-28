import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '@data/models/user';

interface ExtendedUser extends User {
  emojiStatus: { emoji: string; description: string };
  aboutMe: string;
  jobPosition: string;
  department: string;
  location: string;
  office: string;
  workingRate: number;
  workingHours: { startAt: string; endAt: string };
  workingSince: Date;
  birthDate: Date;
  phone: string;
  telegram: string;
  vacationDays: number;
  vacationSince: Date;
  vacationUntil: Date;
}

@Component({
  selector: 'do-employee-info',
  templateUrl: './employee-info.component.html',
  styleUrls: ['./employee-info.component.scss'],
})
export class EmployeeInfoComponent implements OnInit {
  @Input() pageId = '0';

  public employeeInfoForm: FormGroup;
  public employee: ExtendedUser = {
    id: '0',
    firstName: 'Ангелина',
    lastName: 'Иванова',
    middleName: 'Анатольевна',
    photo: 'assets/images/employee-photo.png',
    emojiStatus: { emoji: '🏠', description: 'Работает из дома' },
    aboutMe:
      'С удовольствием отвечу на ваши вопросы, но только в рабочее время! Всем хорошего дня!',
    jobPosition: 'Middle Product Manager',
    department: 'Департамент цифровых технологий',
    location: 'Россия, г. Санкт-Петербург',
    office: 'м. Чернышевская',
    workingRate: 0.75,
    workingHours: {
      startAt: '10:00',
      endAt: '19:00',
    },
    workingSince: new Date(2017, 9),
    birthDate: new Date(1995, 9, 10),
    email: 'evet.pm@lanit-tercom.com',
    phone: '+7(921)623-25-92',
    telegram: '@eve01beast',
    vacationDays: 20,
    vacationSince: new Date(2020, 9, 10),
    vacationUntil: new Date(2020, 9, 20),
    isAdmin: true,
  };

  public selectOptions = {
    jobPosition: ['Middle Product Manager', 'Senior Product Manager'],
    department: ['Департамент цифровых технологий', 'Департамент мопсиков'],
    office: ['м. Чернышевская', 'м. Площадь Восстания'],
    emojiStatus: [
      { emoji: '🏠', description: 'Работает из дома' },
      { emoji: '🏖', description: 'В отпуске' },
    ],
    workingHours: ['8:00', '9:00', '10:00', '16:00', '17:00', '19:00'],
  };

  public isEditable = false;
  public previewPhoto = this.employee.photo;

  constructor(private fb: FormBuilder) {}

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

  canEdit() {
    return this.employee.isAdmin || this.isOwner;
  }

  toggleEditMode() {
    if (!this.isEditable) this.fillForm();
    this.isEditable = !this.isEditable;
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
    this.employeeInfoForm.reset();
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

  changeWorkingRate(inputValue, step) {
    this.employeeInfoForm.patchValue({ workingRate: +inputValue + step });
  }

  ngOnInit(): void {
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
      email: ['', Validators.required],
      phone: ['', Validators.required],
      telegram: [''],
      vacationSince: ['', Validators.required],
      vacationUntil: ['', Validators.required],
      vacationDays: ['', Validators.required],
    });
  }
}
