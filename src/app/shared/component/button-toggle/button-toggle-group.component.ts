import {
	AfterContentInit,
	ChangeDetectionStrategy,
	Component,
	ContentChildren,
	EventEmitter,
	OnInit,
	Output,
	QueryList,
	ViewEncapsulation,
} from '@angular/core';
import { ButtonToggleComponent } from '@shared/component/button-toggle/button-toggle.component';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
	selector: 'do-button-toggle-group',
	template: '<ng-content></ng-content>',
	styleUrls: ['./button-toggle-group.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
})
export class ButtonToggleGroupComponent implements OnInit, AfterContentInit {
	@ContentChildren(ButtonToggleComponent) buttons!: QueryList<ButtonToggleComponent>;
	@Output() toggleChange = new EventEmitter<any>();

	private selectionModel = new SelectionModel<ButtonToggleComponent | undefined>(false, undefined);

	private get selected(): ButtonToggleComponent | undefined {
		return this.selectionModel.selected[0];
	}

	constructor() {}

	ngOnInit(): void {}

	public ngAfterContentInit(): void {
		this.selectionModel.select(...this.buttons.filter((toggle: ButtonToggleComponent) => toggle.checked));
	}

	public changeSelection(toggle: ButtonToggleComponent): void {
		if (this.selected) {
			this.selected.checked = false;
		}
		this.selectionModel.select(toggle);
		this.toggleChange.emit(toggle.value);
	}
}
