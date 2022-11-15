import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RubricData } from '@api/wiki-service/models/rubric-data';
import { map } from 'rxjs/operators';
import { Icons } from '@shared/modules/icons/icons';
import { Observable } from 'rxjs';
import { WikiService } from '../services/wiki.service';

@Component({
	selector: 'do-wiki-headings',
	templateUrl: './wiki-headings.component.html',
	styleUrls: ['./wiki-headings.component.scss'],
	providers: [WikiService],
})
export class WikiHeadingsComponent implements OnInit, AfterViewInit {
	constructor(private wikiService: WikiService, private route: ActivatedRoute) {}

	public readonly Icons = Icons;
	@ViewChild('container') container: any;
	@ViewChild('arrow') arrow: any;

	public rubrics$!: Observable<RubricData[]>;
	public isRubricsOverflow!: boolean;
	public isRubricsExpanded!: boolean;

	public ngOnInit(): void {
		this.rubrics$ = this.route.data.pipe(map((data) => data['rubrics'] as RubricData[]));
	}

	ngAfterViewInit(): void {
		const availableHeight = 136;
		this.isRubricsExpanded = false;
		this.isRubricsOverflow = this.container.nativeElement.clientHeight > availableHeight;
		this.arrow.svgIcon = this.isRubricsOverflow ? Icons.ArrowDownV2 : '';
	}

	public toggleArrow() {
		if (this.arrow.svgIcon === Icons.ArrowDownV2) {
			this.arrow.svgIcon = Icons.ArrowUpV2;
		} else {
			this.arrow.svgIcon = Icons.ArrowDownV2;
		}
		this.isRubricsExpanded = !this.isRubricsExpanded;
	}
}
