import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../model/employee.model';


@Injectable({
  providedIn: 'root',
})
export class EmployeeService {

  private apiUrl: string = `http://localhost:8080/api/v1`;

  http = inject(HttpClient);

  public createEmployee(employee: Employee): Observable<string> {
    const headers = new HttpHeaders()
    .set('FIB-X-AUTH', 'f9Uie8nNf112hx8s')
    .set('Content-Type', 'application/json');

    return this.http.post<string>(
      `${this.apiUrl}/employees`,
      employee,
      {
        headers,
        responseType: 'text' as 'json'
      }
    );

  }

  public updateEmployeeSalary(id: string, employee: Employee): Observable<string> {
    const headers = new HttpHeaders()
    .set('FIB-X-AUTH', 'f9Uie8nNf112hx8s')
    .set('Content-Type', 'application/json');

    return this.http.put<string>(`${this.apiUrl}/employees/${id}`,
       employee,
       {
         headers,
         responseType: 'text' as 'json'
        });
  }

  public deleteById(id: string): Observable<string> {
    const headers = new HttpHeaders()
    .set('FIB-X-AUTH', 'f9Uie8nNf112hx8s')
    .set('Content-Type', 'application/json');

    return this.http.delete<string>(`${this.apiUrl}/employees/${id}`,
      {
      headers,
      responseType: 'text' as 'json'
    }
  );
  }

  public getAllEmployees(): Observable<Employee[]> {
    const headers = new HttpHeaders()
    .set('FIB-X-AUTH', 'f9Uie8nNf112hx8s')
    .set('Content-Type', 'application/json');
    return this.http.get<Employee[]>(`${this.apiUrl}/employees`, { headers });
  }

  public getEmployeeById(id: string): Observable<Employee> {
    const headers = new HttpHeaders()
    .set('FIB-X-AUTH', 'f9Uie8nNf112hx8s')
    .set('Content-Type', 'application/json');
    return this.http.get<Employee>(`${this.apiUrl}/employees/${id}`, { headers });
  }
}
