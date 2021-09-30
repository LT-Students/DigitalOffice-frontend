import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CompanyService } from '@app/services/company/company.service';
import { DepartmentService } from '@app/services/company/department.service';
import { OfficeService } from '@app/services/company/office.service';
import { PositionService } from '@app/services/company/position.service';
import { FileService } from '@app/services/file/file.service';
import { ImageService } from '@app/services/file/image.service';
import { MessageService } from '@app/services/message/message.service';
import { NewsService } from '@app/services/news/news.service';
import { ProjectService } from '@app/services/project/project.service';
import { TaskService } from '@app/services/project/task.service';
import { RightsService } from '@app/services/rights/rights.service';
import { TimeService } from '@app/services/time/time.service';
import { UserService } from '@app/services/user/user.service';
import { CertificateService } from '@app/services/user/certificate.service';
import { CommunicationService } from '@app/services/user/communication.service';
import { CredentialsService } from '@app/services/user/credentials.service';
import { EducationService } from '@app/services/user/education.service';
import { AuthService } from '@app/services/auth/auth.service';
import { NetService } from '@app/services/net.service';
import { EmployeePageService } from '@app/services/employee-page.service';
import { UserApiModule } from '@data/api/user-service/user-api.module';
import { AuthenticationApiModule } from '@data/api/auth-service/authentication-api.module';
import { CompanyApiModule } from '@data/api/company-service/company-api.module';
import { FileApiModule } from '@data/api/file-service/file-api.module';
import { ImageApiModule } from '@data/api/image-service/image-api.module';
import { MessageApiModule } from '@data/api/message-service/message-api.module';
import { NewsApiModule } from '@data/api/news-service/news-api.module';
import { ProjectApiModule } from '@data/api/project-service/project-api.module';
import { RightsApiModule } from '@data/api/rights-service/rights-api.module';
import { TimeApiModule } from '@data/api/time-service/time-api.module';
import { environment } from '../../environments/environment';

@NgModule({
	declarations: [],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		RouterModule,
		HttpClientModule,
		AuthenticationApiModule.forRoot({ rootUrl: `https://user.${environment.apiUrl}` }),
		CompanyApiModule.forRoot({ rootUrl: `https://company.${environment.apiUrl}` }),
		FileApiModule.forRoot({ rootUrl: `https://file.${environment.apiUrl}` }),
		ImageApiModule.forRoot({ rootUrl: `https://image.${environment.apiUrl}` }),
		MessageApiModule.forRoot({ rootUrl: `https://message.${environment.apiUrl}` }),
		NewsApiModule.forRoot({ rootUrl: `https://news.${environment.apiUrl}` }),
		ProjectApiModule.forRoot({ rootUrl: `https://project.${environment.apiUrl}` }),
		RightsApiModule.forRoot({ rootUrl: `https://rights.${environment.apiUrl}` }),
		TimeApiModule.forRoot({ rootUrl: `https://time.${environment.apiUrl}` }),
		UserApiModule.forRoot({ rootUrl: `https://user.${environment.apiUrl}` }),
	],
	providers: [
		AuthService,
		CompanyService,
		DepartmentService,
		OfficeService,
		PositionService,
		FileService,
		ImageService,
		MessageService,
		NewsService,
		ProjectService,
		TaskService,
		RightsService,
		TimeService,
		CertificateService,
		CommunicationService,
		CredentialsService,
		EducationService,
		NetService,
		EmployeePageService,
	],
	exports: [],
})
export class CoreModule {}
