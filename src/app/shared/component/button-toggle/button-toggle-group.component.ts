import {
	AfterContentInit,
	ChangeDetectionStrategy,
	Component,
	ContentChildren,
	EventEmitter,
	HostBinding,
	Input,
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
	@Output() valueChange = new EventEmitter<any>();

	private selectionModel = new SelectionModel<ButtonToggleComponent>(false);

	private get selected(): ButtonToggleComponent | undefined {
		return this.selectionModel.selected[0];
	}

	@HostBinding('class') @Input() color: 'primary' | 'accent' = 'primary';

	constructor() {}

	ngOnInit(): void {}

	public ngAfterContentInit(): void {
		this.selectionModel.select(...this.buttons.filter((toggle: ButtonToggleComponent) => toggle.checked));
	}

	public changeSelection(toggle: ButtonToggleComponent, select: boolean): void {
		if (this.selected && toggle.checked) {
			this.selected.checked = false;
		}

		if (this.selectionModel) {
			if (select) {
				this.selectionModel.select(toggle);
			} else {
				this.selectionModel.deselect(toggle);
			}
		}
		this.valueChange.emit(toggle.value);
	}
}
