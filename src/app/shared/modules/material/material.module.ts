import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MAT_TABS_CONFIG, MatTabsModule } from '@angular/material/tabs';
import {
	DateAdapter,
	MAT_DATE_FORMATS,
	MAT_DATE_LOCALE,
	MAT_RIPPLE_GLOBAL_OPTIONS,
	MatNativeDateModule,
} from '@angular/material/core';
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
import { MatDividerModule } from '@angular/material/divider';
import { DoDateAdapter } from '@app/services/do-date-adapter';
import { MAT_LUXON_DATE_ADAPTER_OPTIONS } from '@angular/material-luxon-adapter';
import { DATE_FORMAT } from '@app/configs/date-formats';
import { Settings } from 'luxon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

Settings.defaultLocale = 'ru';

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
		MatProgressSpinnerModule,
		MatDividerModule,
		MatSlideToggleModule,
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
		MatProgressSpinnerModule,
		MatDividerModule,
		MatSlideToggleModule,
	],
	providers: [
		{ provide: MatDialogRef, useValue: {} },
		{ provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } },
		//TODO for some reason range-picker inside AddHoursComponent getting provided only from this module, not from AppModule
		{
			provide: DateAdapter,
			useClass: DoDateAdapter,
			deps: [MAT_DATE_LOCALE, MAT_LUXON_DATE_ADAPTER_OPTIONS],
		},
		{ provide: MAT_DATE_FORMATS, useValue: DATE_FORMAT },
		{
			provide: MAT_RIPPLE_GLOBAL_OPTIONS,
			useValue: { disabled: true },
		},
		{ provide: MAT_TABS_CONFIG, useValue: { animationDuration: '0ms' } },
	],
})
export class MaterialModule {}
