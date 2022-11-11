import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { RubricData } from '@api/wiki-service/models';
import { WikiApiService } from '../services';

@Injectable({
	providedIn: 'root',
})
export class WikiTreeResolver implements Resolve<RubricData[]> {
	constructor(private wikiTree: WikiApiService) {}

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<RubricData[]> {
		return this.wikiTree.getWikiTree();
	}
}
