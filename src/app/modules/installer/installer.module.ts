//@ts-nocheck
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/material.module';
import { WizardComponent } from './components/wizard/wizard.component';
import { AppModule } from '../../app.module';

@NgModule({
	declarations: [WizardComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MaterialModule, AppModule],
})
export class InstallerModule {}
