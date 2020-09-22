import { Component, Input, Output ,OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'do-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @Input() placeholder: string = '';
  @Output() searchClick = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onSearchClick(value: string): void {
    this.searchClick.emit(value);
  }
}
