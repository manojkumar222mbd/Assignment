import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Router, NavigationEnd } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CompanyService } from '../../shared/company.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
  CompanyData={companyname:'',password:''};
  constructor(public router:Router,private toastr: ToastrService,private CompanyService:CompanyService) { }

  ngOnInit() {
	  if (localStorage.getItem('userId')) {
            this.router.navigate(['../dashboard']);
      }
  }
  
  onLoggedin() {
	  if(!this.CompanyData.companyname || !this.CompanyData.password){
		  return this.toastr.error('Companyname or Password is Required', 'Error');
	  }
	  this.CompanyService.doLogin(this.CompanyData).subscribe(result =>{
		    localStorage.setItem('userId', result.userId);
			localStorage.setItem('clientapikey', result.clientapikey);
			this.toastr.success(result.message,'Success!');
			this.router.navigate(['../dashboard']);
	  },error=>{
			this.toastr.error(error.error.message,'Error!');
	  });
  }
}