/* tslint:disable */
/* eslint-disable */
import { AddImageRequest } from './add-image-request';
import { CreateCommunicationRequest } from './create-communication-request';
import { UserStatus } from './user-status';
export interface CreateUserRequest {
	about?: string;
	avatarImage?: AddImageRequest;

	/**
	 * Time when the user start work day.
	 */
	businessHoursFromUtc?: string;

	/**
	 * Time when the user finish work day.
	 */
	businessHoursToUtc?: string;
	communication: CreateCommunicationRequest;

	/**
	 * User company ID.
	 */
	companyId?: string;

	/**
	 * Date of user birth.
	 */
	dayOfBirth?: string;

	/**
	 * User department ID.
	 */
	departmentId?: string;

	/**
	 * First name of a user.
	 */
	firstName: string;

	/**
	 * Mark whether the user is an administrator.
	 */
	isAdmin?: boolean;

	/**
	 * Last name of a user.
	 */
	lastName: string;

	/**
	 * User location.
	 */
	latitude?: number;

	/**
	 * User location.
	 */
	longitude?: number;

	/**
	 * Middle name of a user.
	 */
	middleName?: string;

	/**
	 * User office ID.
	 */
	officeId?: string;

	/**
	 * User password.
	 */
	password?: string;

	/**
	 * User position ID.
	 */
	positionId?: string;

	/**
	 * User rate
	 */
	rate?: number;

	/**
	 * User role ID.
	 */
	roleId?: string;

	/**
	 * Time when the user started working for the company.
	 */
	startWorkingAt?: string;
	status: UserStatus;
}
