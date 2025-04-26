import { inject, Injectable } from '@angular/core';
import { environment } from './environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class TokenService {

  http = inject(HttpClient);

  environment = environment;

  private tokenEndpoint = `/api/v1/auth/token`;

  private tokenKey = environment.tokenKey;

  public requestToken(): Observable<string> {
    return this.http.get<string>(`${this.environment.host}${this.tokenEndpoint}`, {
      responseType: 'text' as 'json',
    });
  }

  public setToken(token: string): void {
    sessionStorage.setItem(this.tokenKey, token);
  }

  public getToken(): string | null {
    return sessionStorage.getItem(this.tokenKey);
  }

  public clearToken(): void {
    sessionStorage.removeItem(this.tokenKey);
  }

}
