import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StudentView } from 'src/app/ModelViews/student-view';
import { StudentService } from 'src/app/Services/student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  StudentForm: FormGroup;
  StudentList = [];
  studentView: StudentView;
  constructor(private FormBuilder: FormBuilder, private studentSer: StudentService) { }

  ngOnInit(): void {
    this.StudentForm = this.FormBuilder.group({
      Id: [''],
      Name: [''],
      age: ['']
    });
    this.GetallStudents();
  }
  Create() {
    if (this.StudentForm.valid) {
      this.studentSer.CreateStudent(this.StudentForm.value).subscribe((data: any) => {
        if (data != null) {
          this.StudentList = data;
        }
      })
    }
  }
  GetallStudents() {
    this.studentSer.Getstudentsall().subscribe((data: any) => {
      this.StudentList = data;
    });
  }
  Delete(studentdata: any) {
    if (studentdata != undefined) {
      this.studentSer.Delete(studentdata).subscribe((data: any) => {
        alert("One Record is delete Successfully");
        console.log(data);
      })
    }
  }
}
