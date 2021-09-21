import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { TimelineComponent } from './components/timeline/timeline.component';

@NgModule({
	declarations: [
		TimelineComponent
	],
	imports: [SharedModule],
})
export class NewsModule { }
