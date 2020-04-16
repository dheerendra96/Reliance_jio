import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private loginService: AuthenticationService,
    private router: Router, ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  get f() { return this.loginForm.controls; }

  login() {
    if (this.loginForm.valid) {
      this.loginService.login(this.f.username.value, this.f.password.value).subscribe((res) => {
        console.log(34567, res);
        this.router.navigate(['/dashboard']);
      });
    } else {
      this.loginService.openSnackBar('Invalid Form', 'OK');
    }
  }
}

