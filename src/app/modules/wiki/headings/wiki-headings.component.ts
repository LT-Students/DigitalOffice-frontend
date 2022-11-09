import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RubricData } from '@api/wiki-service/models/rubric-data';
import { map } from 'rxjs/operators';
import { WikiService } from '../services/wiki.service';

@Component({
	selector: 'do-wiki-headings',
	templateUrl: './wiki-headings.component.html',
	styleUrls: ['./wiki-headings.component.scss'],
	providers: [WikiService],
})
export class WikiHeadingsComponent implements OnInit, AfterViewInit {
	constructor(private wikiService: WikiService, private route: ActivatedRoute) {}

	public rubrics!: RubricData[];

	public ngOnInit(): void {
		this.route.data.pipe(map((data) => (this.rubrics = data['rubrics'] as RubricData[]))).subscribe();
	}

	ngAfterViewInit(): void {
		const availableHeight = 136;
		const grid = document.getElementById('wiki-headings__container') as HTMLElement;
		const gridFirstTwoRows = grid.clientHeight;
		console.log(gridFirstTwoRows, availableHeight);
		const img = document.getElementById('wiki-arrow') as HTMLImageElement;
		if (gridFirstTwoRows > availableHeight) {
			grid.style.height = String(156 + 'px');
			grid.style.overflow = 'hidden';
			img.style.display = 'block';
			img.src = 'assets/icons/arrow-down-v2.svg';
		} else {
			grid.style.height = String('inherit');
			grid.style.overflow = 'visible';
			img.style.display = 'none';
		}
	}

	public toggleArrow() {
		const img = document.getElementById('wiki-arrow') as HTMLImageElement;
		const grid = document.getElementById('wiki-headings__container') as HTMLElement;
		if (grid.style.overflow === 'hidden') {
			grid.style.overflow = 'visible';
			grid.style.height = 'initial';
			img.src = 'assets/icons/arrow-up-v2.svg';
		} else if (grid.style.overflow === 'visible') {
			grid.style.overflow = 'hidden';
			grid.style.height = String(156 + 'px');
			img.src = 'assets/icons/arrow-down-v2.svg';
		}
	}
}
