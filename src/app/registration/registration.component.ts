import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { AuthenticationService } from '../service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})

export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private loginService: AuthenticationService,
    private router: Router, ) { }

  ngOnInit() {
    this.registrationForm = this.fb.group({
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {
      validator: passwordMatchValidator
    });
  }
  get f() { return this.registrationForm.controls; }
  get password() { return this.registrationForm.get('password'); }
  get confirmPassword() { return this.registrationForm.get('confirmPassword'); }

  /* Called on each input in either password field */
  onPasswordInput() {
    if (this.registrationForm.hasError('passwordMismatch')) {
      this.confirmPassword.setErrors([{ 'passwordMismatch': true }]);
    } else {
      this.confirmPassword.setErrors(null);
    }
  }
  registration() {
    if (this.registrationForm.valid) {
      const userData = {
        username: this.f.username.value,
        firstName: this.f.firstName.value,
        lastName: this.f.lastName.value,
        password: this.f.password.value,
      };
      this.loginService.registration(userData).subscribe((res) => {
        console.log(34567, res);
        if (res.success) {
          this.router.navigate(['/login']);
        }
      });
    } else {
      this.loginService.openSnackBar('Invalid Form', 'OK');
    }
  }
}
export const passwordMatchValidator: ValidatorFn = (registrationForm: FormGroup): ValidationErrors | null => {
  return registrationForm.get('password').value === registrationForm.get('confirmPassword').value ?
    null : { 'passwordMismatch': true };
};
