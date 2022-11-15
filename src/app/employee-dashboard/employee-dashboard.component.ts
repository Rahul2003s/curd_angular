import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup} from '@angular/forms'
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee-dash board.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  formValue !: FormGroup;
  employeeModelObj : EmployeeModel = new EmployeeModel();
  employeeData !: any;
  id1 !: number;
  constructor(private formbuilder: FormBuilder,private api: ApiService,private http:HttpClient) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      firstName : [''],
      lastName : [''],
      email : [''],
      mobile : [''],
      salary : ['']
    })
    
    this.getAllEmployee();
  }

  postEmployeeDetails(){
    this.employeeModelObj.firstname = this.formValue.value.firstName;
    this.employeeModelObj.lastname = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobile = this.formValue.value.mobile;
    this.employeeModelObj.salary = this.formValue.value.salary;

    this.api.postEmploye(this.employeeModelObj)
    .subscribe({
      next: (res) => console.log(res),
      error: () => alert("Something went wrong"),
      complete: () => {
          let ref = document.getElementById('cancel');
          ref?.click();
          this.formValue.reset();
          this.getAllEmployee();
      }
    })
  }
  getAllEmployee(){
    this.api.getEmploye()
    .subscribe({
      next: (res) => this.employeeData = res,
    })
  }
  deleteEmployee(id : any){
    this.api.deleteEmploye(id)
    .subscribe({
      next: (res) => console.log("done"),
      complete: () => {
        this.getAllEmployee();
      }
    })
  }
  onEdit(row : any){
    this.formValue.controls['firstName'].setValue(row.firstname);
    this.formValue.controls['lastName'].setValue(row.lastname);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['salary'].setValue(row.salary);
    this.employeeModelObj.id = row.id;
  }
  updateEmployeeDetails(){
    this.employeeModelObj.firstname = this.formValue.value.firstName;
    this.employeeModelObj.lastname = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobile = this.formValue.value.mobile;
    this.employeeModelObj.salary = this.formValue.value.salary;
    this.api.putEmploye(this.employeeModelObj,this.employeeModelObj.id)
    .subscribe({
      next: ()=> {
          let ref = document.getElementById('cancel');  
          ref?.click();
          this.formValue.reset();
          this.getAllEmployee();
      }
    })
  }
}
