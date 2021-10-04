import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class SessionStorageService {
	constructor() {}

	get(key: string): any | null {
		const value: string | null = sessionStorage.getItem(key);
		const undefinedCheck = value === 'undefined' ? null : value;
		return value && undefinedCheck ? JSON.parse(value) : null;
	}

	set(key: string, value: any): void {
		sessionStorage.setItem(key, JSON.stringify(value));
	}

	remove(key: string): void {
		sessionStorage.removeItem(key);
	}
}
