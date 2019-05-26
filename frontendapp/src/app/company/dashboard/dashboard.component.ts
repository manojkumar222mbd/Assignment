import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CompanyService } from '../../shared/company.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
   isActive: boolean;
    collapsed: boolean;
    showMenu: string;
    pushRightClass: string;
	collapedSideBar: boolean;
	CompanyData={firstname:'',lastname:'',companyname:'',license_startdate:'',license_enddate:''};
    constructor(public router:Router,private toastr: ToastrService,private CompanyService:CompanyService) { }

  ngOnInit() {
	  this.getCompanyDetails();
  }
  
  getCompanyDetails(){
	  var id=localStorage.getItem('userId');
	  this.CompanyService.getLoginDetails(id).subscribe(result =>{
			this.CompanyData=result['response'];
	  },error=>{
			this.toastr.error(error,'Error!');
			this.router.navigate(['../login']);
	  });
  }
  
  logOut(){
	  localStorage.removeItem('userId');
	  localStorage.removeItem('clientapikey');
	  this.router.navigate(['../login']);
  }

}