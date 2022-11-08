import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { WikiTreeService } from '../services/wiki-tree.service';
import { WikiTreeNode } from '../models/tree-types';

@Injectable({
	providedIn: 'root',
})
export class WikiTreeResolver implements Resolve<WikiTreeNode[]> {
	constructor(private wikiTree: WikiTreeService) {}

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<WikiTreeNode[]> {
		return this.wikiTree.getWikiTree();
	}
}
