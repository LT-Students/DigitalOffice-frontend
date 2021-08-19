//@ts-nocheck
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/material.module';
import { WizardComponent } from './components/wizard/wizard.component';
import { AppModule } from '../../app.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
	declarations: [WizardComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MaterialModule, SharedModule],
})
export class InstallerModule {}
