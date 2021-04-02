import { Component } from '@angular/core';
import { GiftsService } from '../services/gifts.service';
import { Gifts } from '../interfaces/search-gifts-response.interface';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styles: [
  ]
})
export class ResultsComponent {
  get results():Gifts[] {
    return this._giftsService.results;
  }

  constructor(private _giftsService:GiftsService) { }
}
