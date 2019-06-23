import { Component } from "@angular/core";

@Component({
  selector: "about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.css"]
})
export class AboutComponent {
  qualities: string[];
  technologies: string[];

  constructor() {
    this.qualities = [
      "Determined",
      "Self motivator",
      "Passionate",
      "Team player"
    ];
    this.technologies = [
      "Javascript/Typescript",
      "Knockout",
      "Angular",
      "React",
      ".NET",
      "C#",
      "Web API"
    ];
  }
}
