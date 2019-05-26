import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router, NavigationEnd } from '@angular/router';
import { AdminService } from '../../shared/admin.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {
  User={username:'',password:''};
  constructor(private toastr: ToastrService,private router:Router,private AdminService:AdminService) { }

  ngOnInit() {
	  if (localStorage.getItem('adminapikey')) {
            this.router.navigate(['../admin/dashboard']);
      }
  }
  
  onAdminLoggedin() {
	  if(!this.User.username || !this.User.password){
		  return this.toastr.error('Username or Password is Required', 'Error');
	  }
	  this.AdminService.doAdminLogin(this.User).subscribe(result =>{
		    localStorage.setItem('adminapikey', result.adminapikey);
			this.toastr.success(result.message,'Success!');
			this.router.navigate(['../admin/dashboard']);
	  },error=>{
			this.toastr.error(error.error.message,'Error!');
	  });
  }
  
  

}
