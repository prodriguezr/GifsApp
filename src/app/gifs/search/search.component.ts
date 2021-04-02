import { Component, ElementRef, ViewChild } from '@angular/core';
import { GiftsService } from '../services/gifts.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
})
export class SearchComponent {
  @ViewChild('txtSearchTerm') txtSearchTerm!:ElementRef<HTMLInputElement>;

  constructor(private giftsService:GiftsService) {}

  search() {
      const value:string = this.txtSearchTerm.nativeElement.value;

      if (value.trim().length === 0)
        return;
        
      this.giftsService.searchGifs(value, this.constructor.name);

      this.txtSearchTerm.nativeElement.value = '';
      this.txtSearchTerm.nativeElement.focus();
  }
}
