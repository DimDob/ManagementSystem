
  import { inject, Injectable } from '@angular/core';
import { environment } from './environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {


  http = inject(HttpClient);

  environment = environment;

  private authEndpoint = `api/v1/auth`;

  private authLoginEndpoint = `login`;

  private authRegisterEndpoint = `register`;

  private authForgotPasswordEndpoint = `forgot-password`;

  private authChangePasswordEndpoint = `change-password`;

    // On user login
    public authenticateUser(credentials: { email: string; password: string;}) {

        const body = {
            email: credentials.email,
            password: credentials.password,
        };

        return this.http.post<string>(`${this.environment.host}/${this.authEndpoint}/${this.authLoginEndpoint}`, body, {
            responseType: 'text' as 'json',
        });

    }

    // On user register
    public registerUser(credentials: { email: string; password: string; confirmPassword: string; isEmployee: boolean }): Observable<string> {

        const body = {
            email: credentials.email,
            password: credentials.password,
            confirmPassword: credentials.confirmPassword,
            isAdmin: credentials.isEmployee,
        };

        return this.http.post<string>(`${this.environment.host}/${this.authEndpoint}/${this.authRegisterEndpoint}`, body, {
            responseType: 'text' as 'json',
        });

    }

    // On user forgot password
    public forgotPassword(email: string): Observable<string> {
      const body = {
        email: email,
      };

      return this.http.post<string>(`${this.environment.host}/${this.authEndpoint}/${this.authForgotPasswordEndpoint}`, body, {
        responseType: 'text' as 'json',
      });
    }

    // On user change password
    public changePassword(passwordData: { newPassword: any; token: string; }) {
      const body = {
        newPassword: passwordData.newPassword,
        token: passwordData.token
      };

      return this.http.put<string>(`${this.environment.host}/${this.authEndpoint}/${this.authChangePasswordEndpoint}`, body, {
        responseType: 'text' as 'json',
      });
    }

}
