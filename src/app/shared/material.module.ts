import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatStepperModule } from '@angular/material/stepper';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
	imports: [
		CommonModule,
		MatButtonModule,
		MatIconModule,
		MatListModule,
		MatGridListModule,
		MatInputModule,
		MatFormFieldModule,
		MatSelectModule,
		MatRadioModule,
		MatDatepickerModule,
		MatChipsModule,
		MatCardModule,
		MatDialogModule,
		MatTabsModule,
		MatCheckboxModule,
		MatNativeDateModule,
		MatSnackBarModule,
		MatMenuModule,
		MatTooltipModule,
		MatAutocompleteModule,
		MatExpansionModule,
		MatTableModule,
		MatSortModule,
		MatToolbarModule,
		OverlayModule,
		MatStepperModule,
		MatPaginatorModule,
		MatSidenavModule,
		MatProgressSpinnerModule
	],
	exports: [
		MatButtonModule,
		MatIconModule,
		MatListModule,
		MatGridListModule,
		MatInputModule,
		MatFormFieldModule,
		MatSelectModule,
		MatRadioModule,
		MatDatepickerModule,
		MatChipsModule,
		MatCardModule,
		MatDialogModule,
		MatTabsModule,
		MatCheckboxModule,
		MatNativeDateModule,
		MatSnackBarModule,
		MatMenuModule,
		MatTooltipModule,
		MatAutocompleteModule,
		MatExpansionModule,
		MatTableModule,
		MatSortModule,
		MatToolbarModule,
		OverlayModule,
		MatStepperModule,
		MatPaginatorModule,
		MatSidenavModule,
		MatProgressSpinnerModule
	],
	providers: [{ provide: MatDialogRef, useValue: {} }],
})
export class MaterialModule { }
