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
import { AuthModule } from './modules/auth/auth.module';
import { AppRoutingModule } from './app-routing.module';
import { AdminModule } from './modules/admin/admin.module';
import { MaterialModule } from './shared/material.module';
import { UserModule } from './modules/user/user.module';
import { AppComponent } from './app.component';
import { EmployeeModule } from './modules/employee/employee.module';
import { InstallerModule } from './modules/installer/installer.module';
import { NewsModule } from './modules/news/news.module';

registerLocaleData(localeRu);

function initializeCompanyAndUser(appInitService: AppInitService) {
	return (): Promise<any> => {
		return appInitService.getCompanyAndUser();
	}
}

@NgModule({
	declarations: [AppComponent],
	imports: [AppRoutingModule, CoreModule, AuthModule, UserModule, AdminModule, EmployeeModule, NgbModule, MaterialModule, InstallerModule, NewsModule],
	providers: [
		Title,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptor,
			multi: true,
		},
		{
			provide: APP_INITIALIZER,
			useFactory: initializeCompanyAndUser,
			deps: [AppInitService],
			multi: true,
		},
		{ provide: LOCALE_ID, useValue: 'ru-RU' },
	],
	bootstrap: [AppComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
