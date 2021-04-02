import { Component } from '@angular/core';
import { GiftsService } from '../../gifs/services/gifts.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  constructor(private giftsService:GiftsService) {}

  get history():string[]{
    return this.giftsService.history;
  }

  search(queryString:string):void {
    this.giftsService.searchGifs(queryString, this.constructor.name);
  }
 }
