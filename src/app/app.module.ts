import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID, APP_INITIALIZER } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AuthInterceptor } from '@app/interceptors/auth.interceptor';
import { UserService } from '@app/services/user/user.service';
import { AuthService } from '@app/services/auth/auth.service';
import { LocalStorageService } from '@app/services/local-storage.service';
import { AuthGuard } from '@app/guards/auth.guard';
import { AttendanceService } from '@app/services/attendance.service';
import { ProjectStore } from '@data/store/project.store';

import { NetService } from '@app/services/net.service';
import { CoreModule } from '@app/core.module';
import { AppInitService } from '@app/services/app-init.service';
import { AuthModule } from './modules/auth/auth.module';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { AdminModule } from './modules/admin/admin.module';
import { MaterialModule } from './shared/material.module';
import { UserModule } from './modules/user/user.module';
import { AppComponent } from './app.component';
import { EmployeeModule } from './modules/employee/employee.module';
import { InstallerModule } from './modules/installer/installer.module';

registerLocaleData(localeRu);

export function initializeUser(appInitService: AppInitService) {
	return (): Promise<any> => {
		return appInitService.getCurrentUser();
	};
}

@NgModule({
	declarations: [AppComponent],
	imports: [AppRoutingModule, CoreModule, AuthModule, UserModule, AdminModule, EmployeeModule, NgbModule, MaterialModule, InstallerModule],
	providers: [
		AuthService,
		AuthGuard,
		LocalStorageService,
		AttendanceService,
		ProjectStore,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptor,
			multi: true,
		},
		{
			provide: APP_INITIALIZER,
			useFactory: initializeUser,
			deps: [AppInitService],
			multi: true,
		},
		{ provide: LOCALE_ID, useValue: 'ru-RU' },
	],
	bootstrap: [AppComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
