import { Injectable } from '@angular/core';
import { BrowserStorage } from '@app/models/browserStorage';

@Injectable({
	providedIn: 'root',
})
export class SessionStorageService extends BrowserStorage {
	private readonly storage: Storage;

	constructor() {
		super();
		this.storage = sessionStorage;
	}

	public clear(): void {
		this.storage.clear();
	}

	public get(key: string): string | null {
		return this.storage.getItem(key);
	}

	public remove(key: string): void {
		this.storage.removeItem(key);
	}

	public set(key: string, value: string): void {
		this.storage.setItem(key, value);
	}
}
