import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.scss'],
})
export class SearcherComponent {
  searchForm: FormGroup = new FormGroup({
    search: new FormControl(''),
  });

  @Output() searchValueChanged: EventEmitter<string> =
    new EventEmitter<string>();

  ngOnInit() {
    this.searchForm
      .get('search')
      ?.valueChanges.pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((searchText: string) => {
        this.searchValueChanged.emit(searchText);
      });
  }
}
