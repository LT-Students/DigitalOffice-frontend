import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  get(key: string): any | null {
    const value: string | null = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  set(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
