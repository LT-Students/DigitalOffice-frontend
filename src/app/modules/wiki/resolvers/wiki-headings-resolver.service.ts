import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { RubricData } from '@api/wiki-service/models/rubric-data';
import { WikiService } from '../services/wiki.service';

@Injectable({
	providedIn: 'root',
})
export class WikiHeadingsResolver implements Resolve<RubricData[]> {
	constructor(private wikiService: WikiService) {}

	public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<RubricData[]> {
		return this.wikiService.getWiki$({ includedeactivated: true });
	}
}
