import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { RouterModule } from "@angular/router";

// Components
import { AppComponent } from "./components/app/app.component";
import { NavMenuComponent } from "./components/navmenu/navmenu.component";
import { AboutComponent } from "./components/about/about.component";
import { HomeComponent } from "./components/home/home.component";
import { StoryComponent } from "./components/story/story.component";

// Services
import { DataService } from "./services/dataservice";

const COMPONENTS = [
  AppComponent,
  NavMenuComponent,
  HomeComponent,
  StoryComponent,
  AboutComponent
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot([
      { path: "", redirectTo: "home", pathMatch: "full" },
      { path: "home", component: HomeComponent },
      { path: "about", component: AboutComponent },
      { path: "**", redirectTo: "home" }
    ])
  ],
  providers: [DataService]
})
export class AppModuleShared {}
