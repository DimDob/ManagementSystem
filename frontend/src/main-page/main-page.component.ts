import { Component } from '@angular/core';
import { ButtonOverviewExample } from "../nav-buttons/nav-buttons.component";

@Component({
  selector: 'app-main-page',
  imports: [ButtonOverviewExample],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {}
