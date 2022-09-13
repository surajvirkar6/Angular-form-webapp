import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { StudentData } from '../StudentData';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-items',
  templateUrl: './add-items.component.html',
  styleUrls: ['./add-items.component.css']
})
export class AddItemsComponent implements OnInit, OnChanges {
  StudentFormData = new StudentData();
  abcd = false;
  @Output() addStudentData: EventEmitter<StudentData> = new EventEmitter();
  @Input() item: StudentData = {
    _id: "",
    name: "",
    email: "",
    standard: "",
    gender: ""
  }
  
  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.StudentFormData._id = this.item._id;
    this.StudentFormData.name = this.item.name;
    this.StudentFormData.email = this.item.email;
    this.StudentFormData.standard = this.item.standard;
    this.StudentFormData.gender = this.item.gender;
  }

  onSubmit() {
    if(this.StudentFormData.name && this.StudentFormData.email && this.StudentFormData.standard && this.StudentFormData.gender){
      this.abcd = true;
      let data = {
        _id: this.StudentFormData._id,
        name: this.StudentFormData.name,
        email: this.StudentFormData.email,
        standard: this.StudentFormData.standard,
        gender: this.StudentFormData.gender
      }
      this.addStudentData.emit(data);
      Swal.fire({
        icon: 'success',
        title: 'Success'
      })
    } else {
      this.abcd = false;
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please check all the fields',
      })
    }
  } 
}
