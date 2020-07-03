import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-student-update',
  templateUrl: './student-update.component.html',
  styleUrls: ['./student-update.component.css'],
})
export class StudentUpdateComponent implements OnInit {
  studentUpdateForm: FormGroup;

  public studID = '';

  public student = {
    firstName: '',
    lastName: '',
    email: '',
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.studID = id;

    this.builderForm();

    this.http
      .get('http://localhost:3000/student/getId/' + this.studID)
      .subscribe(
        (res: any) => {
          this.student = res.message;
          this.setData();
        },
        (err) => {
          console.log(err);
        }
      );
  }

  setData() {
    this.studentUpdateForm.get('firstName').setValue(this.student.firstName);
    this.studentUpdateForm.get('lastName').setValue(this.student.lastName);
    this.studentUpdateForm.get('email').setValue(this.student.email);
  }

  builderForm() {
    this.studentUpdateForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
    });
  }

  get firstName() {
    return this.studentUpdateForm.get('firstName');
  }

  get lastName() {
    return this.studentUpdateForm.get('lastName');
  }

  get email() {
    return this.studentUpdateForm.get('email');
  }
  updateStudent() {
    this.http
      .patch(
        'http://localhost:3000/student/updateStudent/' + this.studID,
        this.studentUpdateForm.value
      )
      .subscribe(
        (res: any) => {
          this.router.navigate(['/viewStudent']);
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  cancel() {
    this.studentUpdateForm.reset();
    this.router.navigate(['/viewStudent']);
  }
}
