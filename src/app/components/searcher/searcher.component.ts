import { Component } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.scss'],
})
export class SearcherComponent {
  constructor(private searcherSvc: SearchService) {}

  updateSearchTerm(event: any): void {
    const searchTerm = event.target.value;
    this.searcherSvc.updateSearchTerm(searchTerm);
  }
}
