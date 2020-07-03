import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  togglePassword = 'visibility';
  disabledPassword = true;
  typePassword = 'password';

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.builderForm();
  }

  builderForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  toggle() {
    if (this.disabledPassword === true) {
      this.disabledPassword = false;
      this.togglePassword = 'visibility_off';
      this.typePassword = 'text';
    } else {
      this.disabledPassword = true;
      this.togglePassword = 'visibility';
      this.typePassword = 'password';
    }
  }

  onForgetPasswordClick() { }

  onLoginClick() {
    this.http.get('http://localhost:3000/user/logIn/').subscribe((res: any) => {
      console.log('Get users', res);
      this.router.navigate(['/viewStudent']);
    }, err => {
        console.log('ERROR IN LOGIN...', err);
    });
  }

  onRegisterClick() {
    this.router.navigate(['/register']);
  }
}
