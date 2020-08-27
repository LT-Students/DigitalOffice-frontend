import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserPageModule } from './modules/user-page/user-page.module';


const routes: Routes = [
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  { path: 'user', component: UserPageModule}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
