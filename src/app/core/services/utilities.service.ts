import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class UtilitiesService {
	private documentClickTarget = new Subject<HTMLElement>();
	public documentClickTarget$ = this.documentClickTarget.asObservable();

	private documentEscapePressed = new Subject();
	public documentEscapePressed$ = this.documentEscapePressed.asObservable();

	constructor() {}

	public setClickTarget(target: HTMLElement): void {
		this.documentClickTarget.next(target);
	}

	public notifyEscapePressed(): void {
		this.documentEscapePressed.next();
	}
}
