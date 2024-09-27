import { Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map} from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AppData } from '../../app.data';
import { Store } from '@ngxs/store';
import { NewsAction } from './news.action';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    "apikey": environment.nyAPIKey
  })
};

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  isActive = false;
  constructor(private _http: HttpClient, private appData: AppData, private store: Store) {}

  setLoad() {
    if (!this.isActive) {
      console.log("changesIsLoadingAPI");
      this.appData.changesIsLoadingAPI(true);
      this.isActive = true;
    }
  }

  setUnload() {
    setTimeout(() => {
      if (this.isActive) {
        this.appData.changesIsLoadingAPI(false);
        this.isActive = false;
      }
    }, 1000);
  }

  public getTopNews(): Observable<any> {
    this.setLoad();
    console.log("getTopNews");
    return this._http
      .post("https://us-central1-portalnews-86a4c.cloudfunctions.net/getStories", {
        data: {}
      }, httpOptions).pipe(
        map((changes: any) => {
          this.setUnload();
          this.store.dispatch(new NewsAction.SetAllStories(changes?.result));
          return changes;
        }));
  }

  public getNews(): Observable<any> {
    console.log("getNews");
    this.setLoad();
    return this._http
      .post("https://us-central1-portalnews-86a4c.cloudfunctions.net/getArticles", {
        data: {}
      }, httpOptions).pipe(
        map((changes: any) => {
          changes?.result?.map((i: any) => {
            i.id = i._id.replace('nyt://article/', '');
            return i;
          })
          this.store.dispatch(new NewsAction.SetAll(changes?.result));
          this.setUnload();
          return changes;
        }));
  }
}
