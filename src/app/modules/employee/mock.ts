import { EducationModel, StudyType } from '@app/models/education.model';

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