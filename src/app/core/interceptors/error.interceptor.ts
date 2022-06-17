import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertService } from '@app/services/alert.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
	constructor(private alert: AlertService) {}

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		return next.handle(request).pipe(
			catchError((error: HttpErrorResponse) => {
				this.handleError(error);
				return throwError(error);
			})
		);
	}

	private handleError(error: HttpErrorResponse): void {
		const errors = error.error?.errors;
		if (!Array.isArray(errors)) {
			this.alert.open('Упс! Что-то пошло не так :(');
			return;
		}
		switch (error.status) {
			case 400: {
				const message = error.error.errors.join('\n');
				this.alert.open(message);
				break;
			}
			case 401:
			case 403: {
				this.alert.open('Недостаточно прав доступа');
				break;
			}
			case 404: {
				this.alert.open('Запрашиваемая информация не найдена');
				break;
			}
			case 500: {
				this.alert.open('Упс! Что-то пошло не так :(');
				break;
			}
			case 0: {
				this.alert.open('Нет подключения к интернету');
				break;
			}
			default: {
				const message = error.error.errors.join('\n');
				this.alert.open(message ?? 'Упс! Что-то пошло не так :(');
				break;
			}
		}
	}
}
