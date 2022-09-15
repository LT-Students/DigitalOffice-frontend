import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedbackListComponent } from './feedback-list/feedback-list.component';
import { FeedbackListResolver } from './feedback-list-resolver.service';

const routes: Routes = [
	{
		path: '',
		component: FeedbackListComponent,
		resolve: {
			feedback: FeedbackListResolver,
		},
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class FeedbackRoutingModule {}
