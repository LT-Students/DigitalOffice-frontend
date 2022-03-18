//@ts-nocheck
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/modules/material/material.module';
import { SharedModule } from '../../shared/shared.module';
import { WizardComponent } from './components/wizard/wizard.component';

@NgModule({
	declarations: [WizardComponent],
	imports: [CommonModule, ReactiveFormsModule, FormsModule, MaterialModule, SharedModule],
})
export class InstallerModule {}
