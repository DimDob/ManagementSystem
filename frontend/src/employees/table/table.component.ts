import { displayedColumns } from './data/table-data';
import {ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { Employee } from '../model/employee.model';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'employee-table',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: 'table.component.html',
  styleUrl: 'table.component.css',
})
export class TableComponent implements OnInit {

  public displayedColumns: string[] = displayedColumns;

  public ELEMENT_DATA: Employee[] = [];

  apiService = inject(EmployeeService);

  cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.apiService.getAllEmployees().subscribe({
      next: (res) => {
        this.dataSource = res;
        this.cdr.detectChanges();
      },
      error: () => alert('Error fetching employees')
    });
  }

  dataSource = this.ELEMENT_DATA;
}
