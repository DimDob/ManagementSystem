import { Component, OnInit, inject, NgZone } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.scss"],
  imports: [
    ReactiveFormsModule
  ]
})
export class ChangePasswordComponent implements OnInit {

  resetPasswordForm: FormGroup;

  token: string | null = null;

  changePasswordService = inject(AuthService);

  router = inject(Router);

  formBuilder = inject(FormBuilder);

  ngZone = inject(NgZone);

  activatedRoute = inject(ActivatedRoute);

  constructor() {
    this.resetPasswordForm = this.formBuilder.group(
      {
        newPassword: ["", [Validators.required, Validators.minLength(6)]],
        confirmNewPassword: ["", [Validators.required]]
      },
      { validator: this.passwordMatchValidator }
    );
  }

  public ngOnInit(): void {
    this.token = this.activatedRoute.snapshot.queryParamMap.get('token');
  }

  public passwordMatchValidator(g: FormGroup) {
    const newPass = g.get("newPassword")?.value;
    const confirmPass = g.get("confirmNewPassword")?.value;
    return newPass === confirmPass ? null : { mismatch: true };
  }

  public onSubmit(): void {
    if (this.resetPasswordForm.valid && this.token) {

      const passwordData = {
        newPassword: this.resetPasswordForm.get("newPassword")?.value,
        token: this.token
      };

      this.changePasswordService.changePassword(passwordData).subscribe({
        next: () => {
          alert("Password changed successfully!");
          this.ngZone.run(() => {
            this.router.navigate(["/auth/login"]);
          });
        },
        error: () => {
          alert("Error changing password");
        }
      });
    }
  }

  onCancel() {
    this.router.navigate(["/auth/login"]);
  }
}
