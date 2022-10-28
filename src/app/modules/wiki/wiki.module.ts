import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { WikiRoutingModule } from './wiki-routing.module';

@NgModule({
	declarations: [],
	imports: [SharedModule, WikiRoutingModule],
})
export class WikiModule {}
