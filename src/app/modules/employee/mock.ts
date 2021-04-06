import { EducationModel, StudyType } from '@app/models/education.model';
import { UserStatus, UserStatusModel } from '@app/models/user-status.model';

export const skills = [
	'Atlassian Jira',
	'Key Account Management',
	'CJM',
	'Agile Project Management',
	'Agile Project Management',
	'Agile Project Management',
	'Agile Project Management',
	'Agile Project Management',
	'Agile Project Management',
];

export const institutes = [
	new EducationModel({
		educationInstitution: 'Университет ИТМО',
		specialization: 'Информационная безопасность',
		studyType: StudyType.CONFRONT,
		startYear: new Date(2014, 0, 1),
		endYear: new Date(2018, 0, 1),
	}),
	new EducationModel({
		educationInstitution:
			'Национальный исследовательский университет «Высшая школа экономики»',
		specialization: 'Информационная безопасность',
		studyType: StudyType.ABSENTIA,
		startYear: new Date(2018, 0, 1),
		endYear: new Date(2020, 0, 1),
	}),
];

export const courses = [
	new EducationModel({
		educationInstitution: 'Бруноям',
		specialization: 'UX/UI дизайнер',
		studyType: StudyType.OFFLINE,
		endYear: new Date(2020, 0, 1),
		certificateId: 'f92f878c-8cad-11eb-8dcd-0242ac130003',
	}),
	new EducationModel({
		educationInstitution: 'HTML-academy',
		specialization: 'Веб-программирование',
		studyType: StudyType.ONLINE,
		endYear: new Date(2020, 0, 1),
		certificateId: 'f92f878c-8cad-11eb-8dcd-0242ac130003',
	}),
];

export const employee = {
	id: '0',
	firstName: 'Ангелина',
	lastName: 'Иванова',
	middleName: 'Анатольевна',
	photoUrl: 'assets/images/employee-photo.png',
	status: UserStatusModel.getUserStatusInfoByType(UserStatus.WorkFromHome),
	about: 'С удовольствием отвечу на ваши вопросы, но только в рабочее время! Всем хорошего дня!',
	jobPosition: 'Middle Product Manager',
	department: 'Департамент цифровых технологий',
	location: 'Россия, г. Санкт-Петербург',
	office: 'м. Чернышевская',
	workingRate: 0.75,
	workingHours: {
		startAt: { hours: 10, minutes: 0 },
		endAt:  { hours: 19, minutes: 0 },
	},
	workingSince: new Date(2017, 9),
	sickSince: new Date(2020, 9, 10),
	birthDate: new Date(1995, 9, 10),
	email: 'evet.pm@lanit-tercom.com',
	phone: '+7(921)623-25-92',
	telegram: '@eve01beast',
	vacationDaysLeft: 20,
	vacationSince: new Date(2020, 9, 10),
	vacationUntil: new Date(2020, 9, 20),
	isAdmin: true,
};
