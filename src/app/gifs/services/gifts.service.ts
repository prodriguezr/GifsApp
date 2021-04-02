import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGiftsResponse, Gifts } from '../interfaces/search-gifts-response.interface';

@Injectable({
  providedIn: 'root'
})
export class GiftsService {
  private _giphyUrl:string = 'https://api.giphy.com/v1/gifs';
  private _apiKey:string = 'zozvKObzy45bOs80GIqzf4nVhj8cpezo';
  private _history:string[] = [];
  public results:Gifts[] = [];

  get history():string[] {
    return [...this._history];
  }

  constructor(private httpClient: HttpClient) {
    this._history = JSON.parse(localStorage.getItem('history')!) || [];
    this.results = JSON.parse(localStorage.getItem('lastResults')!) || [];
  }

  searchGifs(queryString:string, from:string = ''):void {
    console.log(`Call from ${from}`);
    queryString = queryString.toLowerCase();

    const element = this._history.includes(queryString);

    if (!element) {
      this._history.unshift(queryString);

      this._history = this._history.splice(0, 10);

      localStorage.setItem('history', JSON.stringify(this._history));
    }

    const httpParams = new HttpParams()
      .set('api_key', this._apiKey)
      .set('q', queryString)
      .set('limit', '30');

    this.httpClient.get<SearchGiftsResponse>(`${this._giphyUrl}/search`, { params: httpParams })
      .subscribe(resp => {
        console.log(resp.data);
        this.results = resp.data;

        localStorage.setItem('lastResults', JSON.stringify(this.results));
      });
  }
}
