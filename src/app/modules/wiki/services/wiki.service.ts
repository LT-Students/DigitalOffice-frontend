import { Injectable } from '@angular/core';
import { WikiTreeApiService } from '@api/wiki-service/services/wiki-tree-api.service';
import { Observable } from 'rxjs';
import { RubricData } from '@api/wiki-service/models/rubric-data';

export interface WikiTreeParams {
	includedeactivated?: boolean;
}

@Injectable({
	providedIn: 'root',
})
export class WikiService {
	constructor(private wikiTreeApi: WikiTreeApiService) {}

	public getWiki$(params: WikiTreeParams): Observable<Array<RubricData>> {
		return this.wikiTreeApi.getWiki(params);
	}
}
