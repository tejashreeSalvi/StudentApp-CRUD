import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Student } from '../models/student';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  students: Student[];
  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.http.get('http://localhost:3000/student/getStudent/').subscribe(
      (res: any) => {
        // console.log('Get Students', res);
        this.students = res.message;
      },
      (err) => {
        console.log('ERROR IN Getting Students...', err);
      }
    );
  }

  // new Student
  addStudent() {
    this.router.navigate(['/addStudent']);
  }

  editStudent(id) {
    this.router.navigate(['/updateStudent/' + id]);
  }

  deleteStudent(id) {
    this.http
      .delete('http://localhost:3000/student/deleteStudent/' + id)
       .subscribe((res: any) => {
         this.getData();
         // console.log(res);
       }, err => {
           console.log(err);
       });
  }
}
