import { Component, OnInit } from "@angular/core";
import { DataService } from "./../../services/dataservice";
import { Story } from "../../Models/story.model";

@Component({
  selector: "home",
  templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {
  loading: boolean;
  stories: Story[];

  constructor(private ds: DataService) {
    this.loading = true;
    this.stories = [];
  }

  ngOnInit() {
    let savedStories = null;
    if (typeof window !== undefined) {
      savedStories = localStorage.getItem("stories");
    }
    if (savedStories) {
      this.stories = JSON.parse(savedStories);
      this.loading = false;
    } else {
      this.ds.getBestStories().then(data => {
        let response: any = data;

        response.forEach((story: Story) => {
          let s = new Story();

          s.by = story.by;
          s.descendants = story.descendants;
          s.id = story.id;
          s.score = story.score;
          s.time = story.time;
          s.title = story.title;
          s.type = story.type;
          s.url = story.url;

          this.stories.push(s);
        });
        if (typeof window !== undefined) {
          localStorage.setItem("stories", JSON.stringify(this.stories));
        }
        this.loading = false;
      });
    }
  }
}
