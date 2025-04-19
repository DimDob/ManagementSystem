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

  apiService = inject(EmployeeService);

  public ELEMENT_DATA: Employee[] = [];

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

  displayedColumns: string[] = [
    'id',
    'name',
    'surname',
    'department',
    'email',
    'employee_phone_number'
  ];

  dataSource = this.ELEMENT_DATA;
}
