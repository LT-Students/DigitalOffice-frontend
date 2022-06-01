import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { SidebarService } from '@shared/component/sidebar/sidebar.service';

@Component({
	selector: 'do-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [SidebarService],
})
export class SidebarComponent {
	public readonly links$ = this.sidebar.links$;
	public isWideScreen$ = this.breakpoint
		.observe(Breakpoints.XLarge)
		.pipe(map((state: BreakpointState) => state.matches));

	constructor(private sidebar: SidebarService, private breakpoint: BreakpointObserver) {}
}
