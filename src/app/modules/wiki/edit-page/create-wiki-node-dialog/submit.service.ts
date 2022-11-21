import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BrowserStorage } from '@app/models/browserStorage';
import { DialogService } from '@shared/component/dialog/dialog.service';
import { CreateNodeFormValue } from '../../shared/create-wiki-node-form/create-wiki-node-form.component';
import { WikiNodeType, WikiRoutes, CREATE_FORM_NODE_KEY } from '../../models';
import { WikiApiService } from '../../services';

@Injectable()
export class SubmitService {
	constructor(
		private dialog: DialogService,
		private router: Router,
		private storage: BrowserStorage,
		private wikiApi: WikiApiService
	) {}

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

	private createRubric({ nodeType, name, rubricId }: CreateNodeFormValue): Observable<string> {
		return this.wikiApi.createRubric(name, rubricId || undefined).pipe(
			tap(() => {
				switch (nodeType) {
					case WikiNodeType.Rubric:
						this.dialog.info({
							title: 'Рубрика добавлена!',
							message: `Вы добавили рубрику <span class="text-accent_controls_default">${name}.</span>`,
							buttonText: 'Хорошо',
						});
						break;
					case WikiNodeType.SubRubric:
						this.dialog.info({
							title: 'Подрубрика добавлена!',
							message: `Вы добавили подрубрику <span class="text-accent_controls_default">${name}.</span>`,
							buttonText: 'Хорошо',
						});
						break;
					default:
						break;
				}
			})
		);
	}

	private navigateToArticleEditor(formValue: CreateNodeFormValue): Observable<string> {
		this.router.navigate([this.router.url, WikiRoutes.NewArticle]);
		this.storage.set(CREATE_FORM_NODE_KEY, JSON.stringify(formValue));
		return of('');
	}
}
