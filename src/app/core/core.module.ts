import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { UserApiModule } from '@api/user-service/user-api.module';
import { AuthenticationApiModule } from '@api/auth-service/authentication-api.module';
import { CompanyApiModule } from '@api/company-service/company-api.module';
import { FileApiModule } from '@api/file-service/file-api.module';
import { ImageApiModule } from '@api/image-service/image-api.module';
import { MessageApiModule } from '@api/message-service/message-api.module';
import { NewsApiModule } from '@api/news-service/news-api.module';
import { ProjectApiModule } from '@api/project-service/project-api.module';
import { RightsApiModule } from '@api/rights-service/rights-api.module';
import { TimeApiModule } from '@api/time-service/time-api.module';
import { DepartmentApiModule } from '@api/department-service/department-api.module';
import { PositionApiModule } from '@api/position-service/position-api.module';
import { OfficeApiModule } from '@api/office-service/office-api.module';
import { EducationApiModule } from '@api/education-service/education-api.module';
import { AdminApiModule } from '@api/admin-service/admin-api.module';
import { FilterApiModule } from '@api/filter-service/filter-api.module';
import { FeedbackApiModule } from '@api/feedback-service/feedback-api.module';
import { GatewayApiModule } from '@api/gateway-service/gateway-api.module';
import { environment } from '../../environments/environment';

@NgModule({
	declarations: [],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		RouterModule,
		HttpClientModule,
		AdminApiModule.forRoot({ rootUrl: `https://admin.${environment.apiUrl}` }),
		EducationApiModule.forRoot({ rootUrl: `https://education.${environment.apiUrl}` }),
		AuthenticationApiModule.forRoot({ rootUrl: `https://auth.${environment.apiUrl}` }),
		DepartmentApiModule.forRoot({ rootUrl: `https://department.${environment.apiUrl}` }),
		CompanyApiModule.forRoot({ rootUrl: `https://company.${environment.apiUrl}` }),
		FeedbackApiModule.forRoot({ rootUrl: `https://feedback.${environment.apiUrl}` }),
		FileApiModule.forRoot({ rootUrl: `https://file.${environment.apiUrl}` }),
		FilterApiModule.forRoot({ rootUrl: `https://filter.${environment.apiUrl}` }),
		GatewayApiModule.forRoot({ rootUrl: `https://gateway.${environment.apiUrl}` }),
		ImageApiModule.forRoot({ rootUrl: `https://image.${environment.apiUrl}` }),
		MessageApiModule.forRoot({ rootUrl: `https://message.${environment.apiUrl}` }),
		NewsApiModule.forRoot({ rootUrl: `https://news.${environment.apiUrl}` }),
		PositionApiModule.forRoot({ rootUrl: `https://position.${environment.apiUrl}` }),
		ProjectApiModule.forRoot({ rootUrl: `https://project.${environment.apiUrl}` }),
		RightsApiModule.forRoot({ rootUrl: `https://rights.${environment.apiUrl}` }),
		TimeApiModule.forRoot({ rootUrl: `https://time.${environment.apiUrl}` }),
		UserApiModule.forRoot({ rootUrl: `https://user.${environment.apiUrl}` }),
		OfficeApiModule.forRoot({ rootUrl: `https://office.${environment.apiUrl}` }),
	],
})
export class CoreModule {}
