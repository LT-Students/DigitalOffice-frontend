//@ts-nocheck
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
import { PasswordComponent } from './shared/component/password/password.component';
import { FormsModule } from '@angular/forms';

registerLocaleData(localeRu);

function initializeUser(appInitService: AppInitService) {
	return (): Promise<any> => {
		return appInitService.getCurrentUser();
	};
}

function initializeCompany(appInitService: AppInitService) {
	return (): Promise<any> => {
		return appInitService.getCompany();
	}
}

@NgModule({
	declarations: [ AppComponent, PasswordComponent ],
	imports: [ AppRoutingModule, CoreModule, AuthModule, UserModule, AdminModule, EmployeeModule, NgbModule, MaterialModule, InstallerModule, FormsModule ],
	providers: [
		Title,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptor,
			multi: true,
		},
		{
			provide: APP_INITIALIZER,
			useFactory: initializeCompany,
			deps: [ AppInitService ],
			multi: true,
		},
		{
			provide: APP_INITIALIZER,
			useFactory: initializeUser,
			deps: [ AppInitService ],
			multi: true,
		},
		{ provide: LOCALE_ID, useValue: 'ru-RU' },
	],
	bootstrap: [ AppComponent ],
	schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
	exports: [
		PasswordComponent,
	],
})
export class AppModule {}
