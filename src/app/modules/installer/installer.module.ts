import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { WizardComponent } from './components/wizard/wizard.component';
import { InstallerRoutingModule } from './installer-routing.module';

@NgModule({
	declarations: [WizardComponent],
	imports: [SharedModule, InstallerRoutingModule],
})
export class InstallerModule {}
