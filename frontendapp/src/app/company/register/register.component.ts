import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Router, NavigationEnd } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { CompanyService } from '../../shared/company.service';
import { Dateformat} from '../../shared/dateformat.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [routerTransition()]
})
export class RegisterComponent implements OnInit {
  CompanyData={firstname:'',lastname:'',email:'',companyname:'',license_startdate:'',license_enddate:'',password:''};
  confirmpwd='';
  constructor(public router:Router,private toastr: ToastrService,private CompanyService : CompanyService,private Dateformat:Dateformat) { }

  ngOnInit() {
	  
  }
  validateForm(){
	  var re =/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	  if(!this.CompanyData.firstname){
		  return "First Name is Required";
	  }else if(!this.CompanyData.lastname){
		  return "Last Name is Required";
	  }else if(!this.CompanyData.email || !re.test(this.CompanyData.email)){
		  return "Email is Invalid or Required";
	  }else if(!this.CompanyData.companyname){
		  return "CompanyName is Required";
	  }else if(!this.CompanyData.license_startdate){
		  return "License start date is Required";
	  }else if(!this.CompanyData.license_enddate){
		  return "License end date is Required";
	  }else if(!this.CompanyData.password){
		  return "Password is Required";
	  }else if(this.CompanyData.password!=this.confirmpwd){
		  return "Password and confirm password does`nt not matched";
	  }else{
		  return "valid";
	  }
  }
  RegisterNewCompany(){
	  let formErr=this.validateForm();
	  let startdate=this.Dateformat.format(this.CompanyData.license_startdate);
	  let enddate=this.Dateformat.format(this.CompanyData.license_enddate);
	  if(startdate >= enddate){
		  return this.toastr.error('End date should be greater','Error');
	  }
	  if(new Date(enddate) < new Date()){
		  return this.toastr.error('End date should be greater than today`s date','Error');
	  }
	  if(formErr=='valid'){
		  let sendData={firstname:this.CompanyData.firstname,
						  lastname:this.CompanyData.lastname,
						  email:this.CompanyData.email,
						  companyname:this.CompanyData.companyname,
						  license_startdate:startdate,
						  license_enddate:enddate,
						  password:this.CompanyData.password };
		  this.CompanyService.registerNewCompany(sendData).subscribe(result =>{
				this.toastr.success(result.message,'Success');
				this.router.navigate(['../login']);
		  },error=>{
				this.toastr.error(error.error.message,'Error!');
		  });
	  }else{
		  this.toastr.error(formErr,'Error');
	  }
  }
}