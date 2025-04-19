import { Component, inject } from '@angular/core';
import { EmployeesComponent } from '../create/employees.component';
import { DeleteComponent } from '../delete/delete.component';
import { EditComponent } from '../edit/edit/edit.component';
import { Employee } from '../model/employee.model';
import { EmployeeService } from '../service/employee.service';
import { TableComponent } from '../table/table.component';
import { SharedService } from '../service/shared.service';


@Component({
  selector: 'app-main-employee-component',
  imports: [EmployeesComponent, EditComponent, DeleteComponent, TableComponent],
  templateUrl: './main-employee-component.component.html',
  styleUrl: './main-employee-component.component.css',
  providers: [EmployeeService, SharedService]
})
export class MainEmployeeComponentComponent {}
