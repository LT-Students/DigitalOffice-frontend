import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WikiStateService } from './services';

@Component({
	selector: 'do-router-container',
	template: `<router-outlet></router-outlet>`,
	styles: [],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RouterContainerComponent implements OnInit, OnDestroy {
	constructor(private wikiState: WikiStateService, private route: ActivatedRoute) {}

	public ngOnInit(): void {
		const wikiTree = this.route.snapshot.data['wikiTree'];
		this.wikiState.setWikiTree(wikiTree);
	}

	public ngOnDestroy(): void {
		this.wikiState.clearState();
	}
}
