import { ConnectedPosition } from '@angular/cdk/overlay';

export class Positions {
	public static ABOVE: ConnectedPosition = {
		originX: 'center',
		originY: 'top',
		overlayX: 'center',
		overlayY: 'bottom',
	};

	public static BELOW: ConnectedPosition = {
		originX: 'center',
		originY: 'bottom',
		overlayX: 'center',
		overlayY: 'top',
	};

	public static AFTER: ConnectedPosition = {
		originX: 'end',
		originY: 'center',
		overlayX: 'start',
		overlayY: 'center',
	};

	public static BEFORE: ConnectedPosition = {
		originX: 'start',
		originY: 'center',
		overlayX: 'end',
		overlayY: 'center',
	};
}
