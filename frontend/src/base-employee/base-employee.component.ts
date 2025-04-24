import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { SharedService } from '../employees/service/shared.service';
import { EmployeeService } from '../employees/service/employee.service';

@Component({
  selector: 'app-base-employee',
  imports: [],
  templateUrl: './base-employee.component.html',
  styleUrl: './base-employee.component.css'
})
export class BaseEmployeeComponent implements OnInit, OnDestroy {

  showForm: boolean = false;

  apiService = inject(EmployeeService);

  sharedService = inject(SharedService);

  ngOnInit(): void {
    this.sharedService.toggleFormObservable.subscribe(show => {
      this.showForm = show;
    });

  }

  ngOnDestroy(): void {
      this.sharedService.toggleFormSubject.unsubscribe();
  }

}

