import {Component, OnInit} from '@angular/core';
import {MatLabel} from "@angular/material/form-field";
import {MatFormField} from "@angular/material/form-field";
import {NgModule} from "@angular/core";

@Component({
  selector: 'app-new-company',
  templateUrl: './new-company.component.html',
  styleUrls: ['./new-company.component.scss']
})
@NgModule({
  declarations: [
    MatLabel,
    MatFormField
  ],
})

export class NewCompanyComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
