import { Component, NgZone, inject } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { TokenService } from "../token.service";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  imports: [
    ReactiveFormsModule
  ]
})
export class LoginComponent {
  loginForm: FormGroup;

  authService = inject(AuthService);
  tokenService = inject(TokenService);
  router = inject(Router);
  formBuilder = inject(FormBuilder);
  ngZone = inject(NgZone);

  constructor() {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {

      const credentials = {
        email: this.loginForm.get("email")?.value,
        password: this.loginForm.get("password")?.value,
      };

      this.authService.authenticateUser(credentials).subscribe({
        next: (token: string) => {
          this.tokenService.setToken(token);
          this.ngZone.run(() => {
            this.router.navigate(["main-page"]);
          });
        },
        error: (error: any) => {
          alert("User does not exist");
        }
      });
    }
  }

  navigateToRegister() {
    this.router.navigate(["/auth/register"]);
  }

  navigateToForgotPassword() {
    this.router.navigate(["/auth/forgot-password"]);
  }

  private handleGoogleLogin(token: string) {
    console.log("LoginComponent: Handling Google login with token length:", token.length);

  }
}
