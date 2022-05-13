import { Title } from '@angular/platform-browser';
import { NgModule, LOCALE_ID, APP_INITIALIZER } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AuthInterceptor } from '@app/interceptors/auth.interceptor';

import { CoreModule } from '@app/core.module';
import { AppInitService } from '@app/services/app-init.service';
import { MAT_LUXON_DATE_ADAPTER_OPTIONS, MatLuxonDateModule } from '@angular/material-luxon-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { DoDateAdapter } from '@app/services/do-date-adapter';
import { DATE_FORMAT } from '@app/configs/date-formats';
import { SharedModule } from '@shared/shared.module';
import { ErrorInterceptor } from '@app/interceptors/error.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

registerLocaleData(localeRu);

function initializeCompanyAndUser(appInitService: AppInitService) {
	return (): Promise<void> => {
		return appInitService.getCompanyAndUser();
	};
}

@NgModule({
	declarations: [AppComponent],
	imports: [AppRoutingModule, CoreModule, NgbModule, MatLuxonDateModule, SharedModule],
	providers: [
		Title,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptor,
			multi: true,
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: ErrorInterceptor,
			multi: true,
		},
		{
			provide: APP_INITIALIZER,
			useFactory: initializeCompanyAndUser,
			deps: [AppInitService],
			multi: true,
		},
		{ provide: LOCALE_ID, useValue: 'ru-RU' },
		{
			provide: DateAdapter,
			useClass: DoDateAdapter,
			deps: [MAT_DATE_LOCALE, MAT_LUXON_DATE_ADAPTER_OPTIONS],
		},
		{ provide: MAT_DATE_FORMATS, useValue: DATE_FORMAT },
	],
	bootstrap: [AppComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
