import { EducationModel, StudyType } from '@app/models/education.model';
import { UserStatus, UserStatusModel } from '@app/models/user-status.model';
import { UserResponse } from '@data/api/user-service/models/user-response';

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

export const activeProject = {
	id: '1',
	name: 'Алиса в стране Чудес',
	shortName: 'something',
	description:
		'Разработка и внедрение  системы дополненной реальности под PS VR',
	departmentId: 'random id',
	isActive: true,
	consumer: { name: 'Iponkin Brothers', description: 'lalalal' },
	role: 'Product Manager (Middle)',
	startedAt: new Date(2020, 0, 20),
};

export const closedProject = {
	...activeProject,
	isActive: false,
	endedAt: new Date(2021, 5, 5),
};

export const userResponse: any[] = [
	{
		'achievements': [
			{
				'achievementId': '609bedbf7ee0e76ad8ddea55',
				'id': 'e7741a95-c56a-41d4-beb1-16f20a79f47a',
				'image': {
					'content': null,
					'id': '609bedbf210a4b34d61ec8e0',
					'parentId': '609bedbfa6cd1d5ea6058571',
				},
				'name': 'startUp',
				'receivedAt': '10/05/2021',
			},
			{
				'achievementId': '609bedbf030642bb226b44dd',
				'id': '50b4ec32-c399-440e-ae63-1c03b9019939',
				'image': {
					'content': null,
					'id': '609bedbff634baee8dd01616',
					'parentId': '609bedbf4caeb37a1b963a8d',
				},
				'name': 'achievement',
				'receivedAt': '11/05/2021',
			},
		],
		'avatar': {
			'content': null,
			'id': '609bedbf3ecdd3602ee6e23f',
			'parentId': '609bedbfcd2885a69307fec8',
		},
		'certificates': [
			{
				'educationType': 'Online',
				'id': '609bedbfb481329eeb92a75d',
				'image': {
					'content': null,
					'id': '609bedbf8ef3eff50d358471',
					'parentId': '609bedbfe0dc138a4258a3bd',
				},
				'name': 'Сертификат тест',
				'receivedAt': '11/05/2020',
				'schoolName': 'HTML-academy',
			},
		],
		'communications': [
			{
				'type': 'Skype',
				'value': 'test@skype',
			},
			{
				'type': 'Phone',
				'value': 88005553535,
			},
			{
				'type': 'Email',
				'value': 'test@yandex.ru',
			},
			{
				'type': 'Telegram',
				'value': 'test.telegram',
			},
			{
				'type': 'Twitter',
				'value': 'test_twitter',
			},
		],
		'department': {
			'id': '589b03a3-4c0e-4df1-a1c9-a1bce75bb207',
			'name': 'Департамент медицинских решений',
			'startWorkingAt': '01/01/2021',
		},
		'errors': [
			'error1',
		],
		'position': {
			'id': '1974ef4c-8db0-4f28-af65-b4de8e2a830b',
			'name': 'Frontend developer',
			'receivedAt': '01/01/2021',
		},
		'projects': [
			{
				'id': '8a058445-2cbe-45f8-b9fa-c5bb2d02e2fb',
				'isActive': true,
				'name': 'Проект 1',
			},
			{
				'id': '9277a223-80b1-4cf6-8c9e-948ba316b687',
				'isActive': true,
				'name': 'Проект 2',
			},
			{
				'id': '2051f6ec-24cc-49be-986e-3016f0298bc5',
				'isActive': false,
				'name': 'Проект 3',
			},
			{
				'id': '9271f1d5-b405-4307-a661-8cad5031a722',
				'isActive': true,
				'name': 'Проект 4',
			},
			{
				'id': 'cf751298-b7e9-4aca-b5ad-64f35db07c26',
				'isActive': false,
				'name': 'Проект 5',
			},
			{
				'id': 'fe6f50e6-d72a-4d21-acdf-b854a78f77ef',
				'isActive': false,
				'name': 'Проект 6',
			},
			{
				'id': '36ad3429-695e-4b15-a143-617afb800854',
				'isActive': true,
				'name': 'Проект 7',
			},
			{
				'id': 'f4c51b3a-72c6-47cc-9750-88dbc3f2fdd2',
				'isActive': false,
				'name': 'Проект 8',
			},
			{
				'id': '8785c894-69c1-44f4-9d85-045dc2e750ca',
				'isActive': false,
				'name': 'Проект 9',
			},
		],
		'skills': [
			'Agile Project Management',
			'Customer Development',
			'Business Analysis',
			'Google',
		],
		'user': {
			'about': 'С удовольствием отвечу на ваши вопросы, но только в рабочее время! Всем хорошего дня!',
			'firstName': 'Autumn',
			'id': '4d5ba91d-5926-41ba-b05f-15551725c4cc',
			'isAdmin': true,
			'lastName': 'Randall',
			'middleName': 'Moses',
			'rate': '0.75',
			'startWorkingAt': '01/01/2021',
			'status': 'Sick',
		},
	},
	{
		'achievements': [
			{
				'achievementId': '609bedbf7d769c83cbf84b13',
				'id': '557efaa6-6998-4278-9946-ae5f16ebb761',
				'image': {
					'content': null,
					'id': '609bedbf28c595e24dadae21',
					'parentId': '609bedbf6615d93e47039ab4',
				},
				'name': 'startUp',
				'receivedAt': '10/05/2021',
			},
			{
				'achievementId': '609bedbffd285f366142551c',
				'id': 'b95ba133-a7a9-40c3-9f99-a8edb6afb53f',
				'image': {
					'content': null,
					'id': '609bedbf674bcc9e067f660f',
					'parentId': '609bedbf1a374348c9774401',
				},
				'name': 'achievement',
				'receivedAt': '11/05/2021',
			},
		],
		'avatar': {
			'content': null,
			'id': '609bedbf0faf28223726d51d',
			'parentId': '609bedbf90c9d94cd178fb36',
		},
		'certificates': [
			{
				'educationType': 'Online',
				'id': '609bedbf57911bb363b521a3',
				'image': {
					'content': null,
					'id': '609bedbf87580d3593d3e53e',
					'parentId': '609bedbf60a5da044ad2997f',
				},
				'name': 'Сертификат тест',
				'receivedAt': '11/05/2020',
				'schoolName': 'HTML-academy',
			},
		],
		'communications': [
			{
				'type': 'Skype',
				'value': 'test@skype',
			},
			{
				'type': 'Phone',
				'value': 88005553535,
			},
			{
				'type': 'Email',
				'value': 'test@yandex.ru',
			},
			{
				'type': 'Telegram',
				'value': 'test.telegram',
			},
			{
				'type': 'Twitter',
				'value': 'test_twitter',
			},
		],
		'department': {
			'id': 'a0511065-8a39-41c4-8486-d7d9bd5efaf9',
			'name': 'Департамент медицинских решений',
			'startWorkingAt': '01/01/2021',
		},
		'errors': [
			'error1',
		],
		'position': {
			'id': '7a999ba4-ef91-4c1a-8a67-ece1af5d1e59',
			'name': 'Frontend developer',
			'receivedAt': '01/01/2021',
		},
		'projects': [
			{
				'id': '7a19de85-05d5-4cf8-8c2e-4b490b0dbdac',
				'isActive': true,
				'name': 'Проект 1',
			},
			{
				'id': 'dd67a6b7-5fa2-412a-8c59-5bd2f8931bc6',
				'isActive': false,
				'name': 'Проект 2',
			},
			{
				'id': 'd67fbd8a-0273-4c15-990b-e252b620df31',
				'isActive': false,
				'name': 'Проект 3',
			},
			{
				'id': '34dc5737-71b0-4022-af2d-73c72ee1af56',
				'isActive': true,
				'name': 'Проект 4',
			},
			{
				'id': '3fbf1866-719d-4697-b2ab-2163dd4000ef',
				'isActive': false,
				'name': 'Проект 5',
			},
			{
				'id': '231808df-920d-4bcb-b379-11da00e6c7f1',
				'isActive': false,
				'name': 'Проект 6',
			},
			{
				'id': '7f980e90-726b-454c-901b-4ba8d48c01fa',
				'isActive': true,
				'name': 'Проект 7',
			},
			{
				'id': '35c8e490-34b1-479f-9271-c13d31a599eb',
				'isActive': true,
				'name': 'Проект 8',
			},
			{
				'id': 'd7bf3716-5527-4c7f-861e-0c4e5fe58c22',
				'isActive': true,
				'name': 'Проект 9',
			},
		],
		'skills': [
			'Agile Project Management',
			'Customer Development',
			'Business Analysis',
			'Google',
		],
		'user': {
			'about': 'С удовольствием отвечу на ваши вопросы, но только в рабочее время! Всем хорошего дня!',
			'firstName': 'Yates',
			'id': '45d48609-d49b-42b9-bb54-4b0c7201b78e',
			'isAdmin': false,
			'lastName': 'Guthrie',
			'middleName': 'Hayes',
			'rate': '0.75',
			'startWorkingAt': '01/01/2021',
			'status': 'Vacation',
		},
	},
	{
		'achievements': [
			{
				'achievementId': '609bedbf342d0396bd3a1999',
				'id': '22bff018-69dc-40b5-81ca-2295925ceb98',
				'image': {
					'content': null,
					'id': '609bedbf7303f69ec9d38e4e',
					'parentId': '609bedbf0035a7aa2dc7c130',
				},
				'name': 'startUp',
				'receivedAt': '10/05/2021',
			},
			{
				'achievementId': '609bedbf7a6973b69bf26fd3',
				'id': '31096134-ff76-4c18-a813-663b011eab78',
				'image': {
					'content': null,
					'id': '609bedbfdaa2efcb06f47207',
					'parentId': '609bedbfe1b9a09feb64238e',
				},
				'name': 'achievement',
				'receivedAt': '11/05/2021',
			},
		],
		'avatar': {
			'content': null,
			'id': '609bedbf315f772cc6d95483',
			'parentId': '609bedbfdfeb96ffb96337b4',
		},
		'certificates': [
			{
				'educationType': 'Offline',
				'id': '609bedbfef3bd7602dcbfc9e',
				'image': {
					'content': null,
					'id': '609bedbf3cf5d0412837ee93',
					'parentId': '609bedbf7951ce51465881d9',
				},
				'name': 'Сертификат тест',
				'receivedAt': '11/05/2020',
				'schoolName': 'HTML-academy',
			},
		],
		'communications': [
			{
				'type': 'Skype',
				'value': 'test@skype',
			},
			{
				'type': 'Phone',
				'value': 88005553535,
			},
			{
				'type': 'Email',
				'value': 'test@yandex.ru',
			},
			{
				'type': 'Telegram',
				'value': 'test.telegram',
			},
			{
				'type': 'Twitter',
				'value': 'test_twitter',
			},
		],
		'department': {
			'id': '5293f883-fa53-4e17-9081-caab8a5f2596',
			'name': 'Департамент медицинских решений',
			'startWorkingAt': '01/01/2021',
		},
		'errors': [
			'error1',
		],
		'position': {
			'id': 'cc425a59-84c3-4e17-bc6a-22acf212646f',
			'name': 'Frontend developer',
			'receivedAt': '01/01/2021',
		},
		'projects': [
			{
				'id': '3d783019-93f8-4d14-b24c-4b1c0880bb12',
				'isActive': false,
				'name': 'Проект 1',
			},
			{
				'id': 'cf77c73c-0576-4e57-a863-20753139f192',
				'isActive': false,
				'name': 'Проект 2',
			},
			{
				'id': '29f89c5e-b225-40a2-a485-f977094583ea',
				'isActive': false,
				'name': 'Проект 3',
			},
			{
				'id': '3d9c1413-3f28-4399-8081-6098c17da75b',
				'isActive': false,
				'name': 'Проект 4',
			},
			{
				'id': 'c3e4c2c4-090a-40f0-92be-27c1a0653a13',
				'isActive': false,
				'name': 'Проект 5',
			},
			{
				'id': '01fbbb17-804f-438a-9608-73d0f3966a81',
				'isActive': true,
				'name': 'Проект 6',
			},
			{
				'id': '378ed93f-ed6e-43f1-a414-ed33227a7052',
				'isActive': false,
				'name': 'Проект 7',
			},
			{
				'id': '49bc8247-eca0-4e1a-947d-2248dee80a8d',
				'isActive': false,
				'name': 'Проект 8',
			},
			{
				'id': '2869f9e7-6926-4a9b-8444-7e2898198c0c',
				'isActive': true,
				'name': 'Проект 9',
			},
		],
		'skills': [
			'Agile Project Management',
			'Customer Development',
			'Business Analysis',
			'Google',
		],
		'user': {
			'about': 'С удовольствием отвечу на ваши вопросы, но только в рабочее время! Всем хорошего дня!',
			'firstName': 'Greene',
			'id': '0b4a071f-5387-4a43-a767-4cce90fb1284',
			'isAdmin': true,
			'lastName': 'Valdez',
			'middleName': 'Dunlap',
			'rate': 1,
			'startWorkingAt': '01/01/2021',
			'status': 'WorkFromHome',
		},
	},
	{
		'achievements': [
			{
				'achievementId': '609bedbf8352dbf6843dc02e',
				'id': '41e5ae89-a7bf-4b52-a2ff-b35637e0fe8a',
				'image': {
					'content': null,
					'id': '609bedbfc9b9ca4d4042792b',
					'parentId': '609bedbfcfe3861e58bd0f1c',
				},
				'name': 'startUp',
				'receivedAt': '10/05/2021',
			},
			{
				'achievementId': '609bedbf2c88303e493b9428',
				'id': '7a219cad-636c-4af5-b58c-7850ea47d155',
				'image': {
					'content': null,
					'id': '609bedbfc597cf4d61af06cb',
					'parentId': '609bedbfa3e3e7b6920b8509',
				},
				'name': 'achievement',
				'receivedAt': '11/05/2021',
			},
		],
		'avatar': {
			'content': null,
			'id': '609bedbfadb775dab61374be',
			'parentId': '609bedbf083bdb4a1b8aa4d4',
		},
		'certificates': [
			{
				'educationType': 'Online',
				'id': '609bedbff90954c0fba8795f',
				'image': {
					'content': null,
					'id': '609bedbf40ac6f4f28c5c42b',
					'parentId': '609bedbff28f16f8a12818ff',
				},
				'name': 'Сертификат тест',
				'receivedAt': '11/05/2020',
				'schoolName': 'HTML-academy',
			},
		],
		'communications': [
			{
				'type': 'Skype',
				'value': 'test@skype',
			},
			{
				'type': 'Phone',
				'value': 88005553535,
			},
			{
				'type': 'Email',
				'value': 'test@yandex.ru',
			},
			{
				'type': 'Telegram',
				'value': 'test.telegram',
			},
			{
				'type': 'Twitter',
				'value': 'test_twitter',
			},
		],
		'department': {
			'id': '373329eb-4619-4d03-8f2f-fc232444f8b5',
			'name': 'Департамент медицинских решений',
			'startWorkingAt': '01/01/2021',
		},
		'errors': [
			'error1',
		],
		'position': {
			'id': '5b9badbc-226e-4d8a-af47-58a9bd34a04d',
			'name': 'Frontend developer',
			'receivedAt': '01/01/2021',
		},
		'projects': [
			{
				'id': '31f7c241-d242-4ed4-bb05-48ed825c68fc',
				'isActive': true,
				'name': 'Проект 1',
			},
			{
				'id': '1a41d181-e92e-43f9-9120-f523e7773e03',
				'isActive': false,
				'name': 'Проект 2',
			},
			{
				'id': '2fbdb728-0e94-4f4b-8983-e5d5b347153f',
				'isActive': true,
				'name': 'Проект 3',
			},
			{
				'id': '433353ef-201f-4451-9239-776972a1fff9',
				'isActive': false,
				'name': 'Проект 4',
			},
			{
				'id': '1299d920-83b3-4374-b149-b64c6491127b',
				'isActive': false,
				'name': 'Проект 5',
			},
			{
				'id': 'e9778760-14ef-499a-9a60-7d388c7a2927',
				'isActive': false,
				'name': 'Проект 6',
			},
			{
				'id': '880212cd-b08d-4d48-ad73-bb94e6190799',
				'isActive': true,
				'name': 'Проект 7',
			},
			{
				'id': '0489b451-9dd8-4105-81d2-752740ea43b8',
				'isActive': true,
				'name': 'Проект 8',
			},
			{
				'id': '17b3bd01-f214-4c8d-9f3d-cb397a570f6b',
				'isActive': true,
				'name': 'Проект 9',
			},
		],
		'skills': [
			'Agile Project Management',
			'Customer Development',
			'Business Analysis',
			'Google',
		],
		'user': {
			'about': 'С удовольствием отвечу на ваши вопросы, но только в рабочее время! Всем хорошего дня!',
			'firstName': 'Booker',
			'id': '3f353dbf-770a-41ce-bdc5-33d712d9fe6d',
			'isAdmin': false,
			'lastName': 'Wade',
			'middleName': 'Stark',
			'rate': '0.75',
			'startWorkingAt': '01/01/2021',
			'status': 'Vacation',
		},
	},
	{
		'achievements': [
			{
				'achievementId': '609bedbffa7409c775dceeea',
				'id': '90b8fd4d-d4d1-45c7-8dee-b07ca355dc49',
				'image': {
					'content': null,
					'id': '609bedbf6c0b7504cecc3297',
					'parentId': '609bedbfcc6341a87db242ae',
				},
				'name': 'startUp',
				'receivedAt': '10/05/2021',
			},
			{
				'achievementId': '609bedbfeb6b08fb32e1540b',
				'id': 'de0425a4-b523-41a8-a468-7c17da297e73',
				'image': {
					'content': null,
					'id': '609bedbffe73122ccd9523aa',
					'parentId': '609bedbfb49a3364f51bb1b2',
				},
				'name': 'achievement',
				'receivedAt': '11/05/2021',
			},
		],
		'avatar': {
			'content': null,
			'id': '609bedbf5a1633d65776159e',
			'parentId': '609bedbfdccb38025272588f',
		},
		'certificates': [
			{
				'educationType': 'Offline',
				'id': '609bedbf3b05953d40dbc345',
				'image': {
					'content': null,
					'id': '609bedbfdd215b10cc7cedcd',
					'parentId': '609bedbff63aef112d9b60ae',
				},
				'name': 'Сертификат тест',
				'receivedAt': '11/05/2020',
				'schoolName': 'HTML-academy',
			},
		],
		'communications': [
			{
				'type': 'Skype',
				'value': 'test@skype',
			},
			{
				'type': 'Phone',
				'value': 88005553535,
			},
			{
				'type': 'Email',
				'value': 'test@yandex.ru',
			},
			{
				'type': 'Telegram',
				'value': 'test.telegram',
			},
			{
				'type': 'Twitter',
				'value': 'test_twitter',
			},
		],
		'department': {
			'id': 'd2787816-89af-4720-983b-5eccf87f7f5c',
			'name': 'Департамент медицинских решений',
			'startWorkingAt': '01/01/2021',
		},
		'errors': [
			'error1',
		],
		'position': {
			'id': '5e20a5d8-d530-4c9c-b88a-ad846d4b6671',
			'name': 'Frontend developer',
			'receivedAt': '01/01/2021',
		},
		'projects': [
			{
				'id': 'ecbf75c6-4b6e-43dd-ac41-c7a909b7f66c',
				'isActive': true,
				'name': 'Проект 1',
			},
			{
				'id': 'eef561da-5aeb-4341-9c1b-8f427002361b',
				'isActive': true,
				'name': 'Проект 2',
			},
			{
				'id': '760fcab0-ca55-4faf-ad0a-a1d414c78ba4',
				'isActive': true,
				'name': 'Проект 3',
			},
			{
				'id': 'b81f509d-7810-4c4c-aa7e-c52c04d6b834',
				'isActive': false,
				'name': 'Проект 4',
			},
			{
				'id': 'aaf9fe81-ff31-426a-b517-a416a2aa0e15',
				'isActive': false,
				'name': 'Проект 5',
			},
			{
				'id': 'd4b1b5a5-8edf-4d83-a9f5-524f4fba187d',
				'isActive': false,
				'name': 'Проект 6',
			},
			{
				'id': '88923561-804c-4b4f-ab0c-4b8ef2bf9cbd',
				'isActive': true,
				'name': 'Проект 7',
			},
			{
				'id': '274beea1-0680-42cf-a8c8-e86851c99119',
				'isActive': false,
				'name': 'Проект 8',
			},
			{
				'id': 'e9290fb3-5670-44aa-a19a-c29df86994f1',
				'isActive': true,
				'name': 'Проект 9',
			},
		],
		'skills': [
			'Agile Project Management',
			'Customer Development',
			'Business Analysis',
			'Google',
		],
		'user': {
			'about': 'С удовольствием отвечу на ваши вопросы, но только в рабочее время! Всем хорошего дня!',
			'firstName': 'Amelia',
			'id': '69f56023-abe8-461a-bf63-6a7fd9f86155',
			'isAdmin': true,
			'lastName': 'Buck',
			'middleName': 'Quinn',
			'rate': '0.75',
			'startWorkingAt': '01/01/2021',
			'status': 'Vacation',
		},
	},
	{
		'achievements': [
			{
				'achievementId': '609bedbf3b042511f2a2591b',
				'id': 'a6263d7b-6d82-4235-bb5f-9083ec38db5a',
				'image': {
					'content': null,
					'id': '609bedbf7cf2172344488453',
					'parentId': '609bedbf2202e91f67483d1e',
				},
				'name': 'startUp',
				'receivedAt': '10/05/2021',
			},
			{
				'achievementId': '609bedbfaf4699a3f67daacb',
				'id': '45552613-7731-4719-9f6b-a59f5f6f627b',
				'image': {
					'content': null,
					'id': '609bedbf8df02ca18ae752fc',
					'parentId': '609bedbfe0a8db538424a56e',
				},
				'name': 'achievement',
				'receivedAt': '11/05/2021',
			},
		],
		'avatar': {
			'content': null,
			'id': '609bedbf383ae547004cd902',
			'parentId': '609bedbfa274c98e79a7c6b0',
		},
		'certificates': [
			{
				'educationType': 'Offline',
				'id': '609bedbf4eb41c2831488b4b',
				'image': {
					'content': null,
					'id': '609bedbf6fff2a4047bac241',
					'parentId': '609bedbfe762b4963d8296f4',
				},
				'name': 'Сертификат тест',
				'receivedAt': '11/05/2020',
				'schoolName': 'HTML-academy',
			},
		],
		'communications': [
			{
				'type': 'Skype',
				'value': 'test@skype',
			},
			{
				'type': 'Phone',
				'value': 88005553535,
			},
			{
				'type': 'Email',
				'value': 'test@yandex.ru',
			},
			{
				'type': 'Telegram',
				'value': 'test.telegram',
			},
			{
				'type': 'Twitter',
				'value': 'test_twitter',
			},
		],
		'department': {
			'id': 'd46794ee-d5ab-432a-89ba-c0b6ef8687cb',
			'name': 'Департамент медицинских решений',
			'startWorkingAt': '01/01/2021',
		},
		'errors': [
			'error1',
		],
		'position': {
			'id': '3f423cdb-4146-4963-b687-59bfcb9aa657',
			'name': 'Frontend developer',
			'receivedAt': '01/01/2021',
		},
		'projects': [
			{
				'id': '74faf773-4035-482c-ab28-b88362c5e80e',
				'isActive': false,
				'name': 'Проект 1',
			},
			{
				'id': 'ea4c3ead-3c3f-46a4-85c5-893b4f698d00',
				'isActive': true,
				'name': 'Проект 2',
			},
			{
				'id': 'b3a4cb5c-2fab-4b8e-bea8-63c3967a397a',
				'isActive': false,
				'name': 'Проект 3',
			},
			{
				'id': 'eb6bf54f-6984-4e06-9108-dc05525c8707',
				'isActive': true,
				'name': 'Проект 4',
			},
			{
				'id': '993351f5-5c32-4d76-b821-c84fdf554b0e',
				'isActive': true,
				'name': 'Проект 5',
			},
			{
				'id': 'c4897a45-4bd0-4b62-b9cb-c08bd4d71028',
				'isActive': true,
				'name': 'Проект 6',
			},
			{
				'id': '597aec55-e943-49aa-8a65-2505dcc15374',
				'isActive': false,
				'name': 'Проект 7',
			},
			{
				'id': '1f7c852f-3dff-4499-8854-a7416dd3baa3',
				'isActive': true,
				'name': 'Проект 8',
			},
			{
				'id': 'a27be547-3a26-4602-ae86-1248cc09bcc3',
				'isActive': true,
				'name': 'Проект 9',
			},
		],
		'skills': [
			'Agile Project Management',
			'Customer Development',
			'Business Analysis',
			'Google',
		],
		'user': {
			'about': 'С удовольствием отвечу на ваши вопросы, но только в рабочее время! Всем хорошего дня!',
			'firstName': 'Woods',
			'id': '03d5941c-8b84-4516-97d7-24507412d7bf',
			'isAdmin': false,
			'lastName': 'Melendez',
			'middleName': 'Woods',
			'rate': 1,
			'startWorkingAt': '01/01/2021',
			'status': 'Sick',
		},
	},
	{
		'achievements': [
			{
				'achievementId': '609bedbfe7b637f72007b9b3',
				'id': 'c879008a-c8b7-469a-a07e-9d900f670e6c',
				'image': {
					'content': null,
					'id': '609bedbf45ae9ceb83bd7158',
					'parentId': '609bedbf6753c50dae6ec299',
				},
				'name': 'startUp',
				'receivedAt': '10/05/2021',
			},
			{
				'achievementId': '609bedbfa1b21c32de2dc920',
				'id': '5d1e70fe-5266-4f6a-8dcb-f720fbe6a372',
				'image': {
					'content': null,
					'id': '609bedbf8c6fdfc7cd9b4b19',
					'parentId': '609bedbfb7c5be5b4b06a3c1',
				},
				'name': 'achievement',
				'receivedAt': '11/05/2021',
			},
		],
		'avatar': {
			'content': null,
			'id': '609bedbf2400ed5755402727',
			'parentId': '609bedbf64a3e410730cf4e3',
		},
		'certificates': [
			{
				'educationType': 'Offline',
				'id': '609bedbf7a287e6d3c6882d7',
				'image': {
					'content': null,
					'id': '609bedbf9acf448b51f4e32a',
					'parentId': '609bedbf3fc7f67c3325d604',
				},
				'name': 'Сертификат тест',
				'receivedAt': '11/05/2020',
				'schoolName': 'HTML-academy',
			},
		],
		'communications': [
			{
				'type': 'Skype',
				'value': 'test@skype',
			},
			{
				'type': 'Phone',
				'value': 88005553535,
			},
			{
				'type': 'Email',
				'value': 'test@yandex.ru',
			},
			{
				'type': 'Telegram',
				'value': 'test.telegram',
			},
			{
				'type': 'Twitter',
				'value': 'test_twitter',
			},
		],
		'department': {
			'id': 'aacce777-2ed5-4d88-83dd-745b5e81c47c',
			'name': 'Департамент медицинских решений',
			'startWorkingAt': '01/01/2021',
		},
		'errors': [
			'error1',
		],
		'position': {
			'id': '6ab075f8-399d-48df-b36f-c012c1ed5730',
			'name': 'Frontend developer',
			'receivedAt': '01/01/2021',
		},
		'projects': [
			{
				'id': 'aec712de-f617-4649-ad9c-f92d538d358f',
				'isActive': true,
				'name': 'Проект 1',
			},
			{
				'id': 'fd4c58bb-2236-4901-ad33-8997ea5197ed',
				'isActive': false,
				'name': 'Проект 2',
			},
			{
				'id': '50d9e5c7-2667-4970-8cef-48c1df65bee9',
				'isActive': false,
				'name': 'Проект 3',
			},
			{
				'id': 'af764de9-0fd9-4b34-938f-ce99bf0c0118',
				'isActive': false,
				'name': 'Проект 4',
			},
			{
				'id': 'edbddbdd-f739-426a-a27b-e5839d9bbddd',
				'isActive': true,
				'name': 'Проект 5',
			},
			{
				'id': '3673ceb6-dd1a-49e5-8162-db9e70959542',
				'isActive': false,
				'name': 'Проект 6',
			},
			{
				'id': 'c76801d2-c33c-4a79-83ac-18abc5116426',
				'isActive': true,
				'name': 'Проект 7',
			},
			{
				'id': '874377f6-84bf-42d6-a730-333e2bbd3924',
				'isActive': false,
				'name': 'Проект 8',
			},
			{
				'id': '78da73f2-ec19-4f9d-b3cc-8ed6a8ee0816',
				'isActive': true,
				'name': 'Проект 9',
			},
		],
		'skills': [
			'Agile Project Management',
			'Customer Development',
			'Business Analysis',
			'Google',
		],
		'user': {
			'about': 'С удовольствием отвечу на ваши вопросы, но только в рабочее время! Всем хорошего дня!',
			'firstName': 'Robert',
			'id': '3dc73f42-2afa-4247-969a-be020ef7e6d4',
			'isAdmin': true,
			'lastName': 'Knox',
			'middleName': 'Stevenson',
			'rate': 1,
			'startWorkingAt': '01/01/2021',
			'status': 'WorkFromHome',
		},
	},
	{
		'achievements': [
			{
				'achievementId': '609bedbfa299496e295ca922',
				'id': '03328532-b921-457c-bd7f-fdc138b76245',
				'image': {
					'content': null,
					'id': '609bedbf500428e5c7918a60',
					'parentId': '609bedbf38bdd22ffb7c6cb0',
				},
				'name': 'startUp',
				'receivedAt': '10/05/2021',
			},
			{
				'achievementId': '609bedbf5be407658577df0d',
				'id': '6068b69c-4d6c-4033-9658-c52903a24d8d',
				'image': {
					'content': null,
					'id': '609bedbf32d33249fdd655da',
					'parentId': '609bedbf3b1c72af61b4eb73',
				},
				'name': 'achievement',
				'receivedAt': '11/05/2021',
			},
		],
		'avatar': {
			'content': null,
			'id': '609bedbf1e2985f7026a5450',
			'parentId': '609bedbf632bb2f5b05650fb',
		},
		'certificates': [
			{
				'educationType': 'Online',
				'id': '609bedbf83287516b584749d',
				'image': {
					'content': null,
					'id': '609bedbf18ebe3d64bf9cfee',
					'parentId': '609bedbf18a6d62db2c0050f',
				},
				'name': 'Сертификат тест',
				'receivedAt': '11/05/2020',
				'schoolName': 'HTML-academy',
			},
		],
		'communications': [
			{
				'type': 'Skype',
				'value': 'test@skype',
			},
			{
				'type': 'Phone',
				'value': 88005553535,
			},
			{
				'type': 'Email',
				'value': 'test@yandex.ru',
			},
			{
				'type': 'Telegram',
				'value': 'test.telegram',
			},
			{
				'type': 'Twitter',
				'value': 'test_twitter',
			},
		],
		'department': {
			'id': 'ee2d09b8-b851-439e-b764-09f873397b36',
			'name': 'Департамент медицинских решений',
			'startWorkingAt': '01/01/2021',
		},
		'errors': [
			'error1',
		],
		'position': {
			'id': '0b2c3d7d-83f3-465e-a1f6-449c47edd726',
			'name': 'Frontend developer',
			'receivedAt': '01/01/2021',
		},
		'projects': [
			{
				'id': '1e61b132-d133-4610-8d5c-b7994e0c686f',
				'isActive': true,
				'name': 'Проект 1',
			},
			{
				'id': 'c5dcd361-4ab1-4d61-94cc-e436e3c87f57',
				'isActive': false,
				'name': 'Проект 2',
			},
			{
				'id': '05b18217-d5bd-4fcc-986c-c113748e7e1c',
				'isActive': false,
				'name': 'Проект 3',
			},
			{
				'id': '801b3997-9648-48a5-8320-7542fc0135a2',
				'isActive': true,
				'name': 'Проект 4',
			},
			{
				'id': '02c00e84-198f-4670-a150-001813acb3e9',
				'isActive': false,
				'name': 'Проект 5',
			},
			{
				'id': '8838fe5d-1c9e-42ec-bd55-67dff21bccd5',
				'isActive': true,
				'name': 'Проект 6',
			},
			{
				'id': '688ec0e4-0b04-47f8-a688-f1e681a4def4',
				'isActive': false,
				'name': 'Проект 7',
			},
			{
				'id': 'ba6e591a-9948-4724-8c1b-737196f03060',
				'isActive': false,
				'name': 'Проект 8',
			},
			{
				'id': '58cc6f6d-1fd5-4a05-a0af-b7de0dd38838',
				'isActive': true,
				'name': 'Проект 9',
			},
		],
		'skills': [
			'Agile Project Management',
			'Customer Development',
			'Business Analysis',
			'Google',
		],
		'user': {
			'about': 'С удовольствием отвечу на ваши вопросы, но только в рабочее время! Всем хорошего дня!',
			'firstName': 'Finch',
			'id': '010658b8-d07b-4904-88ca-8cb8f2c2f9f9',
			'isAdmin': false,
			'lastName': 'Vargas',
			'middleName': 'Larson',
			'rate': 1,
			'startWorkingAt': '01/01/2021',
			'status': 'WorkFromHome',
		},
	},
	{
		'achievements': [
			{
				'achievementId': '609bedbffca1a9e8c64fce12',
				'id': '68c62408-9739-4644-bd35-feac44709b97',
				'image': {
					'content': null,
					'id': '609bedbf6d19250279bc2c51',
					'parentId': '609bedbfcb65c072c39ec104',
				},
				'name': 'startUp',
				'receivedAt': '10/05/2021',
			},
			{
				'achievementId': '609bedbf13fd73c488bd83f4',
				'id': '06f92d53-db7b-4c83-b0ec-919d700bba93',
				'image': {
					'content': null,
					'id': '609bedbf5ccea2ded81d8241',
					'parentId': '609bedbf63d163acc95e086d',
				},
				'name': 'achievement',
				'receivedAt': '11/05/2021',
			},
		],
		'avatar': {
			'content': null,
			'id': '609bedbfac32bb04e76c1b1a',
			'parentId': '609bedbf7301dfc2d04ad26a',
		},
		'certificates': [
			{
				'educationType': 'Online',
				'id': '609bedbf1f34bdeb5c4e1e9e',
				'image': {
					'content': null,
					'id': '609bedbf89661d00c62744d5',
					'parentId': '609bedbf28b351b89606921f',
				},
				'name': 'Сертификат тест',
				'receivedAt': '11/05/2020',
				'schoolName': 'HTML-academy',
			},
		],
		'communications': [
			{
				'type': 'Skype',
				'value': 'test@skype',
			},
			{
				'type': 'Phone',
				'value': 88005553535,
			},
			{
				'type': 'Email',
				'value': 'test@yandex.ru',
			},
			{
				'type': 'Telegram',
				'value': 'test.telegram',
			},
			{
				'type': 'Twitter',
				'value': 'test_twitter',
			},
		],
		'department': {
			'id': '011396e5-72e1-4c8f-a909-360441d96ad7',
			'name': 'Департамент медицинских решений',
			'startWorkingAt': '01/01/2021',
		},
		'errors': [
			'error1',
		],
		'position': {
			'id': 'bdd9ba4b-821c-4cc7-a8ca-0a244c0c1943',
			'name': 'Frontend developer',
			'receivedAt': '01/01/2021',
		},
		'projects': [
			{
				'id': '2aabc5b5-a98a-4b0f-9188-9e1872b778ce',
				'isActive': true,
				'name': 'Проект 1',
			},
			{
				'id': '53290390-57bc-47da-8f01-2bf70ebd8e82',
				'isActive': false,
				'name': 'Проект 2',
			},
			{
				'id': 'c3489640-0600-43f1-831e-25bb1e05c752',
				'isActive': true,
				'name': 'Проект 3',
			},
			{
				'id': 'eaa7f126-1706-49c5-9644-7879e486f746',
				'isActive': true,
				'name': 'Проект 4',
			},
			{
				'id': 'b585254e-7382-484b-8e33-f8ce7739189e',
				'isActive': false,
				'name': 'Проект 5',
			},
			{
				'id': '989303f7-142b-4ec4-9285-4757c49e1268',
				'isActive': true,
				'name': 'Проект 6',
			},
			{
				'id': 'e61a1b8d-0c65-4b8e-9214-349a028f6c89',
				'isActive': true,
				'name': 'Проект 7',
			},
			{
				'id': '698dc0cd-79b4-43cf-a9a7-e747fe52c34e',
				'isActive': false,
				'name': 'Проект 8',
			},
			{
				'id': '6f4e120a-eb63-4889-9dd3-2cc2541becd7',
				'isActive': false,
				'name': 'Проект 9',
			},
		],
		'skills': [
			'Agile Project Management',
			'Customer Development',
			'Business Analysis',
			'Google',
		],
		'user': {
			'about': 'С удовольствием отвечу на ваши вопросы, но только в рабочее время! Всем хорошего дня!',
			'firstName': 'Pamela',
			'id': '1292eda4-fd87-441f-bd31-386b46c89afd',
			'isAdmin': true,
			'lastName': 'Perry',
			'middleName': 'Britt',
			'rate': '0.25',
			'startWorkingAt': '01/01/2021',
			'status': 'Sick',
		},
	},
	{
		'achievements': [
			{
				'achievementId': '609bedbf5bf555a003d25da5',
				'id': '78694f2b-4c88-4e4e-bf29-f455630623de',
				'image': {
					'content': null,
					'id': '609bedbf3537173443cd4999',
					'parentId': '609bedbfd3e30d05c196d97d',
				},
				'name': 'startUp',
				'receivedAt': '10/05/2021',
			},
			{
				'achievementId': '609bedbfd1de5231624b25bd',
				'id': 'b86e453a-5705-4b7a-89b6-577eb99b0571',
				'image': {
					'content': null,
					'id': '609bedbf33cbc1ccc598f7c2',
					'parentId': '609bedbf792ec833780adc0b',
				},
				'name': 'achievement',
				'receivedAt': '11/05/2021',
			},
		],
		'avatar': {
			'content': null,
			'id': '609bedbf2251401d05590b92',
			'parentId': '609bedbfff21b031adafef85',
		},
		'certificates': [
			{
				'educationType': 'Offline',
				'id': '609bedbf57a6bcc473671d66',
				'image': {
					'content': null,
					'id': '609bedbf57a8121b5127773e',
					'parentId': '609bedbf5237264833d816da',
				},
				'name': 'Сертификат тест',
				'receivedAt': '11/05/2020',
				'schoolName': 'HTML-academy',
			},
		],
		'communications': [
			{
				'type': 'Skype',
				'value': 'test@skype',
			},
			{
				'type': 'Phone',
				'value': 88005553535,
			},
			{
				'type': 'Email',
				'value': 'test@yandex.ru',
			},
			{
				'type': 'Telegram',
				'value': 'test.telegram',
			},
			{
				'type': 'Twitter',
				'value': 'test_twitter',
			},
		],
		'department': {
			'id': 'd72ba4a8-67ee-4d86-98c8-1f329ea367d6',
			'name': 'Департамент медицинских решений',
			'startWorkingAt': '01/01/2021',
		},
		'errors': [
			'error1',
		],
		'position': {
			'id': 'a5f856ce-37c7-4fb0-a75e-4609329ae623',
			'name': 'Frontend developer',
			'receivedAt': '01/01/2021',
		},
		'projects': [
			{
				'id': '92776c19-23cb-493d-8174-1ed7fb5dfb65',
				'isActive': true,
				'name': 'Проект 1',
			},
			{
				'id': '3b872418-d3aa-4430-bfe8-e519326bd29e',
				'isActive': false,
				'name': 'Проект 2',
			},
			{
				'id': 'a46443ba-971e-4112-940b-152cd8925c04',
				'isActive': false,
				'name': 'Проект 3',
			},
			{
				'id': '9d8466a5-4c08-4318-b880-db58e0c08ab2',
				'isActive': true,
				'name': 'Проект 4',
			},
			{
				'id': '33a66e55-dc23-40ce-a06a-d057d776b59b',
				'isActive': true,
				'name': 'Проект 5',
			},
			{
				'id': 'd40cf356-4843-418c-94b0-e6c53ee976a9',
				'isActive': false,
				'name': 'Проект 6',
			},
			{
				'id': '53ddefde-6718-48c7-8d0c-9239a4135ce4',
				'isActive': false,
				'name': 'Проект 7',
			},
			{
				'id': '3b12104a-6443-4595-8814-8d6d5b8d2ff7',
				'isActive': false,
				'name': 'Проект 8',
			},
			{
				'id': 'b7bffd93-27d5-4fbb-a4b9-10536e1cd230',
				'isActive': false,
				'name': 'Проект 9',
			},
		],
		'skills': [
			'Agile Project Management',
			'Customer Development',
			'Business Analysis',
			'Google',
		],
		'user': {
			'about': 'С удовольствием отвечу на ваши вопросы, но только в рабочее время! Всем хорошего дня!',
			'firstName': 'Angelica',
			'id': '51026c8b-8002-41ff-ab79-65f7247dd7a7',
			'isAdmin': false,
			'lastName': 'Vance',
			'middleName': 'Griffin',
			'rate': 1,
			'startWorkingAt': '01/01/2021',
			'status': 'WorkFromOffice',
		},
	},
]
