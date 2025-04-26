import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { AuthInterceptor } from './app/auth/interceptor/auth_interceptor';
import { provideAppInitializer, inject } from '@angular/core';
import { TokenService } from './app/auth/token.service';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([AuthInterceptor])
    ),
    provideAppInitializer(() => {
      const tokenService = inject(TokenService);
      return tokenService.initializeToken();
    })
  ]
}).catch((err) => console.error(err));
