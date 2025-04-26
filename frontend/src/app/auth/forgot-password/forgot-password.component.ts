import { Component, inject } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.scss"],
  imports: [ReactiveFormsModule]
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;

  authService = inject(AuthService);
  router = inject(Router);
  formBuilder = inject(FormBuilder);

  constructor() {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      const email = this.forgotPasswordForm.get("email")?.value;

      this.authService.forgotPassword(email).subscribe({
        next: (status: string) => {
          alert(status);
        },
        error: () => {
         alert("User does not exist");
        }
      });
    }
  }

  navigateToLogin() {
    this.router.navigate(["/auth/login"]);
  }
}
