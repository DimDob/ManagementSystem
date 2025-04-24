import { displayedColumns } from './data/table-data';
import {ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { Employee } from '../model/employee.model';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../service/employee.service';
import { BaseTableComponent } from '../../base-table/base-table.component';

@Component({
  selector: 'employee-table',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: 'table.component.html',
  styleUrl: 'table.component.css',
})
export class TableComponent  extends BaseTableComponent  implements OnInit {

  public displayedColumns: string[] = displayedColumns;

  public ELEMENT_DATA: Employee[] = [];

  apiService = inject(EmployeeService);

  override ngOnInit(): void {
    this.apiService.getAllEmployees().subscribe({
      next: (res) => {
        this.dataSource = res;
      },
      error: () => alert('Error fetching employees')
    });
  }

  dataSource = this.ELEMENT_DATA;
}
