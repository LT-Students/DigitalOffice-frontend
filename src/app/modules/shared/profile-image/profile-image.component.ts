import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'do-profile-image',
  templateUrl: './profile-image.component.html',
  styleUrls: ['./profile-image.component.scss']
})
export class ProfileImageComponent implements OnInit {

  @Input() src: string;

  constructor() { }

  ngOnInit(): void{
  }

}
