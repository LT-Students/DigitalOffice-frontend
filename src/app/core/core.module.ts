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

@NgModule({
	declarations: [],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		RouterModule,
		HttpClientModule
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
		UserService,
		NetService
	],
	exports: [],
})
export class CoreModule {}
