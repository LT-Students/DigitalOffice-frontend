import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

export interface UnderlinedOptions {
	size: string;
}

type color_style =
	| 'accent_color'
	| 'accent_color_bright'
	| 'accent_color_light'
	| 'accent_positive'
	| 'accent_positive_dark'
	| 'positive_accent_bright'
	| 'light_1'
	| 'light_2'
	| 'light_3'
	| 'gray'
	| 'gray1'
	| 'dark_1'
	| 'dark_2'
	| 'dark_3'
	| 'dark_4'
	| 'overtime'
	| 'negative_accent'
	| 'preza_dc'
	| 'ultimate_orange'
	| 'font_color'
	| 'button_orange'
	| 'blue_3';

@Directive({
	selector: '[doText]',
})
export class TextDirective implements OnInit {
	private _underlined: boolean;

	@Input() color: color_style;
	@Input() regularTextSize: 'regular' | 'small';
	@Input() underlinedSize: 'sm' | 'l';
	@Input()
	get underlined() {
		return this._underlined;
	}
	set underlined(value: boolean) {
		this._underlined = coerceBooleanProperty(value);
	}

	constructor(private el: ElementRef, private renderer: Renderer2) {
		this.underlinedSize = 'l';
		this.regularTextSize = 'regular';
	}

	public ngOnInit() {
		this._handleTagName(this.el.nativeElement.tagName);
		if (this.underlined) {
			this.renderer.addClass(this.el.nativeElement, '-underlined');
			this.renderer.addClass(this.el.nativeElement, `-underlined-${this.underlinedSize}`);
		}
		if (this.color) {
			this.renderer.addClass(this.el.nativeElement, `text-${this.color}`);
		}
	}

	private _handleTagName(tagName: string): void {
		switch (tagName) {
			case 'H1':
			case 'H2':
			case 'H3':
			case 'H4': {
				this._setHeaderAttributes(tagName.toLowerCase());
				break;
			}
			case 'SPAN':
			case 'P': {
				this._setRegularTextAttributes();
				break;
			}
			default: {
				this._setRegularTextAttributes();
				break;
			}
		}
	}

	private _setHeaderAttributes(className: string): void {
		this.renderer.addClass(this.el.nativeElement, className);
	}

	private _setRegularTextAttributes(): void {
		this.renderer.addClass(this.el.nativeElement, `${this.regularTextSize}_text`);
	}
}
