import { Story } from "./../../Models/story.model";
import { Component, Input } from "@angular/core";

@Component({
  selector: "story",
  templateUrl: "./story.component.html",
  styleUrls: ["./story.component.css"]
})
export class StoryComponent {
  @Input() story: Story;

  constructor() {}
}
