import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { WikiTreeService } from '../services/wiki-tree.service';

@Component({
	selector: 'do-article-page',
	templateUrl: './article-page.component.html',
	styleUrls: ['./article-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticlePageComponent {
	public tree$ = this.route.data.pipe(map((data) => data.wikiTree));
	public articleId = this.route.snapshot.params['id'];

	constructor(private wikiTree: WikiTreeService, private route: ActivatedRoute) {}
}
