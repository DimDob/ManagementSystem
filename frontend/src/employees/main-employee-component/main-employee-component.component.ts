import { Component } from '@angular/core';
import { EmployeesComponent } from "../create/employees.component";
import { EditComponent } from "../edit/edit/edit.component";
import { DeleteComponent } from "../delete/delete.component";
import { TableComponent } from "../table/table.component";

@Component({
  selector: 'app-main-employee-component',
  imports: [EmployeesComponent, EditComponent, DeleteComponent, TableComponent],
  templateUrl: './main-employee-component.component.html',
  styleUrl: './main-employee-component.component.css'
})
export class MainEmployeeComponentComponent {

}
