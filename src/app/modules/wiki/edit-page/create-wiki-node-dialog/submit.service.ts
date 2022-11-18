import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { CreateNodeFormValue } from '../../shared/create-wiki-node-form/create-wiki-node-form.component';
import { WikiNodeType, WikiRoutes } from '../../models';
import { WikiApiService } from '../../services';

@Injectable({
	providedIn: 'root',
})
export class SubmitService {
	constructor(private router: Router, private wikiApi: WikiApiService) {}

	public submit$(formValue: CreateNodeFormValue): Observable<string | never> {
		switch (formValue.nodeType) {
			case WikiNodeType.Rubric:
			case WikiNodeType.SubRubric:
				return this.createRubric(formValue);
			case WikiNodeType.Article:
				return this.navigateToArticleEditor(formValue);
			default:
				return throwError('Form value is not provided!');
		}
	}

	private createRubric({ name, rubricId }: CreateNodeFormValue): Observable<string> {
		return this.wikiApi.createRubric(name, rubricId || undefined);
	}

	private navigateToArticleEditor(formValue: CreateNodeFormValue): Observable<string> {
		this.router.navigate([this.router.url, WikiRoutes.NewArticle]);
		return of('');
	}
}
