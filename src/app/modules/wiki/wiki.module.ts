import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { WikiSearchBarComponent } from './search-bar/wiki-search-bar.component';
import { WikiRoutingModule } from './wiki-routing.module';
import { WikiHeadingsComponent } from './headings/wiki-headings.component';
import { WikiMainComponent } from './main/wiki-main.component';
import { WikiHeadingsItemComponent } from './headings/headings-item/wiki-headings-item.component';

@NgModule({
	declarations: [WikiMainComponent, WikiSearchBarComponent, WikiHeadingsComponent, WikiHeadingsItemComponent],
	imports: [SharedModule, WikiRoutingModule],
})
export class WikiModule {}
