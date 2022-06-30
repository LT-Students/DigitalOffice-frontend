//@ts-nocheck
export interface TeamMember {
	id: string;
	name: string;
	level?: string;
	lead?: boolean;
	profileImgSrc: string;
}

export interface Team {
	name: string;
	members: TeamMember[];
}

export const teamCards: Team[] = [
	{
		name: 'Teamleads',
		members: [
			{
				id: '46e6baee-b767-432c-8aa8-29465aa63f1e',
				name: 'Kline Spears',
				profileImgSrc: 'https://www.fillmurray.com/305/305',
				level: 'junior',
				lead: false,
			},
			{
				id: 'bf3f9dca-58fb-4231-83dd-b849da93997b',
				name: 'Klein Key',
				profileImgSrc: 'https://www.fillmurray.com/305/305',
				level: 'senior',
				lead: false,
			},
			{
				id: 'a2b1e235-4da3-4e88-a001-a36303df7ef1',
				name: 'Bonner Stout',
				profileImgSrc: 'https://www.fillmurray.com/305/305',
				level: 'junior',
				lead: false,
			},
			{
				id: '89e9b968-f9e8-4545-93d1-3b40b8b4ce71',
				name: 'Atkinson Jacobson',
				profileImgSrc: 'https://www.fillmurray.com/305/305',
				level: 'senior',
				lead: true,
			},
			{
				id: 'a7242805-6f8a-40b4-9b02-f7f752afaaf1',
				name: 'Mcclure Pruitt',
				profileImgSrc: 'https://www.fillmurray.com/305/305',
				level: 'middle',
				lead: false,
			},
			{
				id: '0be6f49e-80b5-4067-ab9e-f0d623b48b32',
				name: 'Lynn Parrish',
				profileImgSrc: 'https://www.fillmurray.com/305/305',
				level: 'middle',
				lead: false,
			},
			{
				id: '3befbcf1-38cf-4a9c-a36a-3f8043ef4ee3',
				name: 'Cote Tate',
				profileImgSrc: 'https://www.fillmurray.com/305/305',
				level: 'junior',
				lead: false,
			},
			{
				id: '513a1ca3-ce23-4ccb-a028-761f034e0b3d',
				name: 'Maxine Parks',
				profileImgSrc: 'https://www.fillmurray.com/305/305',
				level: 'senior',
				lead: true,
			},
			{
				id: 'c5cf1ef7-f4c6-4eba-afad-c5c55430ccf6',
				name: 'Lee Stevenson',
				profileImgSrc: 'https://www.fillmurray.com/305/305',
				level: 'senior',
				lead: true,
			},
			{
				id: '49601194-9dc5-42e6-995e-9ebd04cac55a',
				name: 'Geraldine Molina',
				profileImgSrc: 'https://www.fillmurray.com/305/305',
				level: 'middle',
				lead: false,
			},
		],
	},
	{
		name: 'Front-End Developers',
		members: [
			{
				id: '57650e5d-5773-40d9-a751-6047b1906448',
				name: 'Sabrina Pittman',
				profileImgSrc: 'https://www.fillmurray.com/305/305',
				level: 'middle',
				lead: false,
			},
			{
				id: '7aa4e839-0336-4a85-b762-6158ad643285',
				name: 'Price Mathis',
				profileImgSrc: 'https://www.fillmurray.com/305/305',
				level: 'junior',
				lead: false,
			},
			{
				id: 'c51b7624-1abc-47cd-afe5-6e5239b762a3',
				name: 'Sofia Hall',
				profileImgSrc: 'https://www.fillmurray.com/305/305',
				level: 'middle',
				lead: true,
			},
			{
				id: 'bbd95585-9e8e-4af5-abf4-df5648e9887f',
				name: 'Finley Parks',
				profileImgSrc: 'https://www.fillmurray.com/305/305',
				level: 'middle',
				lead: true,
			},
			{
				id: 'd06f9198-bbb7-426c-aa31-5434eafa4093',
				name: 'Mariana Oneill',
				profileImgSrc: 'https://www.fillmurray.com/305/305',
				level: 'senior',
				lead: true,
			},
			{
				id: 'c1d87be8-0ec6-408f-b8db-69b4d0ace6ae',
				name: 'Angeline Fletcher',
				profileImgSrc: 'https://www.fillmurray.com/305/305',
				level: 'senior',
				lead: false,
			},
		],
	},
	{
		name: 'Back-End Developers',
		members: [
			{
				id: 'c0e8397b-bd31-4df0-9b3c-43598295a2c6',
				name: 'Mckenzie Rivers',
				profileImgSrc: 'https://www.fillmurray.com/305/305',
				level: 'junior',
				lead: false,
			},
			{
				id: '093cabd0-0923-4313-a3a0-4251871edcfd',
				name: 'Becker Ferrell',
				profileImgSrc: 'https://www.fillmurray.com/305/305',
				level: 'senior',
				lead: false,
			},
			{
				id: 'b12a185e-4cfc-4d19-9983-a0bd140ff312',
				name: 'Gabrielle Crawford',
				profileImgSrc: 'https://www.fillmurray.com/305/305',
				level: 'junior',
				lead: false,
			},
			{
				id: '5f8fdcb8-ee10-4412-a8f6-0ff750bd66c3',
				name: 'Doyle Lindsay',
				profileImgSrc: 'https://www.fillmurray.com/305/305',
				level: 'middle',
				lead: true,
			},
			{
				id: '1acd6a23-df45-4f4b-8a6a-163e446364a4',
				name: 'Lizzie Harrington',
				profileImgSrc: 'https://www.fillmurray.com/305/305',
				level: 'middle',
				lead: true,
			},
			{
				id: '83afe05e-a13a-41f8-b426-fe6ef0d4dc50',
				name: 'Flora Chambers',
				profileImgSrc: 'https://www.fillmurray.com/305/305',
				level: 'junior',
				lead: false,
			},
			{
				id: '382aee21-dfbb-42ce-8c2a-41a2093bc6c5',
				name: 'Sutton Hines',
				profileImgSrc: 'https://www.fillmurray.com/305/305',
				level: 'middle',
				lead: true,
			},
			{
				id: '4567112b-1af8-4ac8-a7e0-0ed2e538ac03',
				name: 'Crane Nixon',
				profileImgSrc: 'https://www.fillmurray.com/305/305',
				level: 'senior',
				lead: true,
			},
			{
				id: 'b24c98ae-3e32-4cb0-9b6e-9d2603932f0d',
				name: 'Lena Phelps',
				profileImgSrc: 'https://www.fillmurray.com/305/305',
				level: 'junior',
				lead: true,
			},
			{
				id: 'f9c44315-a51b-468a-ae42-9c644ba6fbbd',
				name: 'Hinton Little',
				profileImgSrc: 'https://www.fillmurray.com/305/305',
				level: 'senior',
				lead: false,
			},
			{
				id: 'd78e58f6-a80b-44af-86d9-5fedbc7fa826',
				name: 'Francis Erickson',
				profileImgSrc: 'https://www.fillmurray.com/305/305',
				level: 'middle',
				lead: true,
			},
			{
				id: '650f4d4a-6965-45fa-9cdc-82eaec951bdb',
				name: 'Wilson Le',
				profileImgSrc: 'https://www.fillmurray.com/305/305',
				level: 'middle',
				lead: true,
			},
			{
				id: '3bc0645d-bd3a-4cdf-aecd-457fadcf0ad3',
				name: 'Mia Rogers',
				profileImgSrc: 'https://www.fillmurray.com/305/305',
				level: 'middle',
				lead: false,
			},
			{
				id: '08ee7e39-5598-4eb2-b4fa-78cb26022f92',
				name: 'Garza Ryan',
				profileImgSrc: 'https://www.fillmurray.com/305/305',
				level: 'junior',
				lead: false,
			},
			{
				id: 'a94ee77c-67a7-42f3-afee-08acb8be8cb5',
				name: 'Nellie Garrett',
				profileImgSrc: 'https://www.fillmurray.com/305/305',
				level: 'senior',
				lead: true,
			},
			{
				id: 'e1f9c3cc-db28-4c68-b973-d06d5259b596',
				name: 'Lucile Ball',
				profileImgSrc: 'https://www.fillmurray.com/305/305',
				level: 'middle',
				lead: false,
			},
			{
				id: 'f75dc400-3505-46d0-b3e5-299175ae79e9',
				name: 'Sophie Hines',
				profileImgSrc: 'https://www.fillmurray.com/305/305',
				level: 'middle',
				lead: true,
			},
			{
				id: '9a76a1c0-35ee-4510-8a6b-15d36eee5b40',
				name: 'Fuentes Houston',
				profileImgSrc: 'https://www.fillmurray.com/305/305',
				level: 'senior',
				lead: false,
			},
			{
				id: '3bc0645d-bd3a-4cdf-aecd-457fadcf0ad3',
				name: 'Mia Rogers',
				profileImgSrc: 'https://www.fillmurray.com/305/305',
				level: 'middle',
				lead: false,
			},
			{
				id: '08ee7e39-5598-4eb2-b4fa-78cb26022f92',
				name: 'Garza Ryan',
				profileImgSrc: 'https://www.fillmurray.com/305/305',
				level: 'junior',
				lead: false,
			},
			{
				id: 'a94ee77c-67a7-42f3-afee-08acb8be8cb5',
				name: 'Nellie Garrett',
				profileImgSrc: 'https://www.fillmurray.com/305/305',
				level: 'senior',
				lead: true,
			},
			{
				id: 'e1f9c3cc-db28-4c68-b973-d06d5259b596',
				name: 'Lucile Ball',
				profileImgSrc: 'https://www.fillmurray.com/305/305',
				level: 'middle',
				lead: false,
			},
			{
				id: 'f75dc400-3505-46d0-b3e5-299175ae79e9',
				name: 'Sophie Hines',
				profileImgSrc: 'https://www.fillmurray.com/305/305',
				level: 'middle',
				lead: true,
			},
			{
				id: '9a76a1c0-35ee-4510-8a6b-15d36eee5b40',
				name: 'Fuentes Houston',
				profileImgSrc: 'https://www.fillmurray.com/305/305',
				level: 'senior',
				lead: false,
			},
		],
	},
];