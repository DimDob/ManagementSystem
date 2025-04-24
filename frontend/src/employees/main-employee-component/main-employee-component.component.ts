import { Component } from '@angular/core';
import { EmployeesComponent } from '../create/employees.component';
import { DeleteComponent } from '../delete/delete.component';
import { EditComponent } from '../edit/edit/edit.component';
import { EmployeeService } from '../service/employee.service';
import { SharedService } from '../service/shared.service';
import { RenderTableButtonComponent } from "../table/render-table-button/render-table-button.component";
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-main-employee-component',
  imports: [EmployeesComponent, EditComponent, DeleteComponent, RenderTableButtonComponent,MatDividerModule],
  templateUrl: './main-employee-component.component.html',
  styleUrl: './main-employee-component.component.css',
  providers: [EmployeeService, SharedService]
})
export class MainEmployeeComponentComponent {}
