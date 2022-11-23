export interface ExistingUserBase {
	id: string;
}

export interface AddUsersDialogData {
	existingUsers: ExistingUserBase[];
	entityId: string;
	entityName: string;
}

export interface NewUserBase {
	id: string;
	imageId?: string;
	firstName: string;
	lastName: string;
	middleName?: string;
}
