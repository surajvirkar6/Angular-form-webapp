import { Component, OnInit } from '@angular/core';
import { StudentData } from '../StudentData';
import { HttpClient } from '@angular/common/http';
import Swal  from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-view-items',
  templateUrl: './view-items.component.html',
  styleUrls: ['./view-items.component.css']
})

export class ViewItemsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'standard', 'gender', 'edit', 'delete'];
  studentData: StudentData[] = [];
  sendEditData: boolean = false;
  editStudentsData: StudentData = {
    _id: "",
    name: "",
    email: "",
    standard: "",
    gender: ""
  };

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.getStudentData();
  }

  getStudentData() {
    this.http.get('http://localhost:8080/').subscribe(data => {
      this.studentData = data as StudentData[];
    });
  }

  deleteStudentData(element: any) {
    this.http.delete(`http://localhost:8080/?id=${element._id}`).subscribe(data => {
      this.getStudentData();
    });
  }

  editStudentData(element: any) {
    this.editStudentsData = element;
    this.sendEditData = true;
  }

  addStudentData(student: StudentData) {
    if (this.sendEditData) {
      this.http.put(`http://localhost:8080/`, student).subscribe(data => {
        this.sendEditData = false;
        this.getStudentData();
      });
    } else {
      this.http.post('http://localhost:8080/', student).subscribe((data: any) => {
        if (data.code === 11000) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Student already exists!',
          })
        } else if (data.errors) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please enter valid email address.',
          })
        } else {
          this.getStudentData();
        }
      })
    }
  }
}