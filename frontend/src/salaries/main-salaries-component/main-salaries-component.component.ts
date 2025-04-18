import { Component } from '@angular/core';
import { SalariesComponent } from "../salaries.component";
import { ExportComponent } from "../export/export.component";

@Component({
  selector: 'app-main-salaries-component',
  imports: [SalariesComponent, ExportComponent],
  templateUrl: './main-salaries-component.component.html',
  styleUrl: './main-salaries-component.component.css'
})
export class MainSalariesComponentComponent {}
