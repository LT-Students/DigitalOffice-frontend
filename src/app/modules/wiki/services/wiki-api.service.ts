import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RubricData } from '@api/wiki-service/models';
import { WikiTreeApiService } from '@api/wiki-service/services';

@Injectable({
	providedIn: 'root',
})
export class WikiApiService {
	constructor(private wikiApi: WikiTreeApiService) {}

	public getWikiTree(): Observable<RubricData[]> {
		return this.wikiApi.getWiki();
	}
}
