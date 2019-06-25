import { Observable, BehaviorSubject } from "rxjs";
import { Component, OnInit } from "@angular/core";
import { DataService } from "./../../services/dataservice";
import { Story } from "../../Models/story.model";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  loading: boolean;
  stories: Story[];
  filter: string;
  filteredStories: BehaviorSubject<Story[]> = new BehaviorSubject<Story[]>([]);

  constructor(private ds: DataService) {
    this.loading = true;
    this.stories = [];
    this.filter = "";
  }

  ngOnInit() {
    let savedStories = null;
    // Check local storage to see if stories are cached
    if (typeof window !== undefined) {
      savedStories = localStorage.getItem("stories");
    }
    if (savedStories) {
      this.stories = JSON.parse(savedStories);
      this.loading = false;
      this.filteredStories.next(this.stories);
    } else {
      this.ds.getBestStories().then(data => {
        let response: any = data;

        // For each story that comes back, create the story obj
        // and push it to the story arr and set to local storage.
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
        this.filteredStories.next(this.stories);
      });
    }
  }

  onFilterChange(event: any) {
    let temp: Story[] = [];
    // if filter is an empty string assume its a clear and add
    // all stories to the filtered stories
    if (event === "") {
      this.filteredStories.next(this.stories);
      this.filter = "";
    }
    // filter the stories based on the incoming input value
    // filter checks if the value matches either the title or by fields
    else {
      this.stories.forEach(story => {
        if (
          story.title
            .toLowerCase()
            .indexOf(event.target.value.toLowerCase()) !== -1 ||
          story.by.toLowerCase().indexOf(event.target.value.toLowerCase()) !==
            -1
        ) {
          temp.push(story);
        }
      });
      this.filteredStories.next(temp);
    }
  }
}
