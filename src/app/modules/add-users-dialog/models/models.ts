import { ImageInfo } from '@app/models/image.model';

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
	avatar?: ImageInfo;
	firstName: string;
	lastName: string;
	middleName?: string;
}
