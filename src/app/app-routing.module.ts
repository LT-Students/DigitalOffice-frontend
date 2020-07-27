import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ChartComponent} from "./chart/chart.component";


const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  declarations: [
    ChartComponent
  ],
  exports: [RouterModule, ChartComponent]
})
export class AppRoutingModule { }
