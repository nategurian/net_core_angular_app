import { Http, Headers } from "@angular/http";
import { Injectable, Inject } from "@angular/core";

@Injectable()
export class DataService {
  baseurl: string;

  constructor(private http: Http, @Inject("BASE_URL") url: string) {
    this.baseurl = url;
  }

  public getBestStories() {
    const headers = new Headers();
    let promise = new Promise((resolve, reject) => {
      headers.append("Content-Type", "application/json");
      this.http
        .get(`${this.baseurl}api/Stories/GetBestStories`, { headers })
        .subscribe(data => {
          let response: any = data;
          let stories = JSON.parse(response._body);
          resolve(stories);
        });
    });
    return promise;
  }
}
