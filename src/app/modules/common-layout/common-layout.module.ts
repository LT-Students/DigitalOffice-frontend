import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { LoadingBarRoutingModule } from '@shared/modules/loading-bar-routing/loading-bar-routing.module';
import { FeedbackModule } from '../feedback/feedback.module';
import { ContentContainerComponent } from './content-container/content-container.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarHeaderComponent } from './sidebar/sidebar-header/sidebar-header.component';
import { SidebarItemComponent } from './sidebar/sidebar-item/sidebar-item.component';

@NgModule({
	declarations: [
		ContentContainerComponent,
		HeaderComponent,
		SidebarComponent,
		SidebarHeaderComponent,
		SidebarItemComponent,
	],
	imports: [SharedModule, FeedbackModule, LoadingBarModule, LoadingBarRoutingModule],
})
export class CommonLayoutModule {}
