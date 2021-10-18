import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsEditorComponent } from './components/news-editor/news-editor.component';

const newsRoutes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: 'write' },
	{ path: 'write', component: NewsEditorComponent },
	{ path: '**', redirectTo: 'write', pathMatch: 'full' },
];

@NgModule({
	imports: [RouterModule.forChild(newsRoutes)],
	exports: [RouterModule],
})
export class NewsRoutingModule {}
