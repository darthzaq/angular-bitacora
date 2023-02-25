import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {}

  sections: string[] = ["ToDo", "Payments"];
  section: string = "Payments";

  changeSection = (nextSection: string) => {
    this.section = nextSection;
  }

}
