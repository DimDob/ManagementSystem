import { inject, Injectable } from '@angular/core';
import { Employee } from '../model/employee.model';
import { BehaviorSubject } from 'rxjs';
import { EmployeeService } from './employee.service';

@Injectable({
  providedIn: 'root',
})
export class SharedService {

  toggleFormSubject = new BehaviorSubject<boolean>(false);

  toggleFormObservable = this.toggleFormSubject.asObservable();

  showForm: boolean = false;

  employeeService = inject(EmployeeService);

  employee: Employee = {
    id: '',
    name: '',
    surname: '',
    department: '',
    salary: '',
    salary_amount: 0,
    email: '',
    employee_phone_number: ''
  };


  public prefillEmployeeForm(id: string) {
    this.employeeService.getEmployeeById(id).subscribe({
      next: (res) => {
        this.employee = res;
        this.toggleForm();
      },
      error: () => alert(`No employee found with id ${id}`)
    });
  }

  public toggleForm() {
    this.showForm = !this.showForm;
    this.toggleFormSubject.next(this.showForm);
  }

  public resetForm() {
    this.employee = {
      id:'',
      name: '',
      surname: '',
      department: '',
      salary: '',
      salary_amount: 0,
      email: '',
      employee_phone_number: ''
    };
  }

}
