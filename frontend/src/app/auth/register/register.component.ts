import { Component, NgZone, inject } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { RegisterData } from "./interfaces/RegisterData";
import { AuthService } from "../auth.service";
import { MatCheckboxModule } from "@angular/material/checkbox";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
  imports: [
    MatCheckboxModule,
    ReactiveFormsModule
  ]
})
export class RegisterComponent {
  registerForm: FormGroup;

  private authService = inject(AuthService);
  private router = inject(Router);
  private ngZone = inject(NgZone);
  formBuilder = inject(FormBuilder);

  constructor() {
    this.registerForm = this.formBuilder.group(
      {
        email: ["", [Validators.required, Validators.email]],
        password: ["", [Validators.required, Validators.minLength(6)]],
        isEmployee: [false],
        confirmPassword: ["", [Validators.required, Validators.minLength(6)]],
      },
      {
        validators: this.passwordMatchValidator
      }
    );
  }

  onSubmit() {
    if (this.registerForm.valid) {

      const credentials: RegisterData = {
        email: this.registerForm.get("email")?.value,
        password: this.registerForm.get("password")?.value,
        confirmPassword: this.registerForm.get("confirmPassword")?.value,
        isEmployee: this.registerForm.get("isEmployee")?.value,
      };

      this.authService.registerUser(credentials).subscribe({
        next: () => {
          alert("User created");
          this.ngZone.run(() => {
            this.navigateToLogin();
          });
        },
        error: () => {
          alert("User already exists");
        }
      });
  }
}
  navigateToLogin() {
    this.router.navigate(["/auth/login"]);
  }

  private passwordMatchValidator(form: FormGroup) {
    const password = form.get("password");
    const confirmPassword = form.get("confirmPassword");

    if (password && confirmPassword) {
      if (password.value !== confirmPassword.value) {
        confirmPassword.setErrors({ ...confirmPassword.errors, passwordMismatch: true });
      } else {
        const errors = confirmPassword.errors;
        if (errors) {
          delete errors["passwordMismatch"];
          if (Object.keys(errors).length === 0) {
            confirmPassword.setErrors(null);
          } else {
            confirmPassword.setErrors(errors);
          }
        }
      }
    }

  }
}
