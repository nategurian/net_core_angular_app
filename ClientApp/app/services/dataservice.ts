import { Http, Headers } from "@angular/http";
import { Injectable } from "@angular/core";
import { Story } from "../Models/story.model";

@Injectable()
export class DataService {
  constructor(private http: Http) {}

  public getBestStories() {
    const headers = new Headers();
    let promise = new Promise((resolve, reject) => {
      headers.append("Content-Type", "application/json");
      this.http
        .get("http://localhost:5000/api/Stories/GetBestStories", { headers })
        .subscribe(data => {
          let response: any = data;
          let stories = JSON.parse(response._body);
          resolve(stories);
        });
    });
    return promise;
  }
}
