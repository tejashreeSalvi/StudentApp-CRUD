import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.css'],
})
export class StudentAddComponent implements OnInit {
  studentRegistrationForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.builderForm();
  }

  builderForm() {
    this.studentRegistrationForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
    });
  }

  get firstName() {
    return this.studentRegistrationForm.get('firstName');
  }

  get lastName() {
    return this.studentRegistrationForm.get('lastName');
  }

  get email() {
    return this.studentRegistrationForm.get('email');
  }

  // Methods
  register() {
    this.http.post('http://localhost:3000/student/addStudent', this.studentRegistrationForm.value).subscribe((res: any) => {
      console.log(res);
      this.router.navigate(['/viewStudent']);
    }, err => {
        console.log('Error');
    });
  }

  cancel() {
    this.studentRegistrationForm.reset();
    this.router.navigate(['/viewStudent']);
  }
}
