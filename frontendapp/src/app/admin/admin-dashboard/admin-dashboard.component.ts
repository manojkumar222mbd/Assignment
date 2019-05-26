import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../../shared/admin.service';
import { Dateformat} from '../../shared/dateformat.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  cardArr=[
	{class:"primary",text:"Total",count:0,icon:"tasks"},
	{class:"success",text:"Active",count:0,icon:"book"},
	{class:"danger",text:"InActive",count:0,icon:"clock-o"},
	{class:"warning",text:"Deleted",count:0,icon:"trash"}
  ];
  closeResult="";
  companyArr=[];
  CompanyData={_id:"",license_startdate:{},license_enddate:{},activestatus:''};
  constructor(private router:Router,private Dateformat:Dateformat,private modalService: NgbModal,private toastr: ToastrService,private AdminService:AdminService) { }

  ngOnInit() {
	  this.getCompany();
  }
	
	getCompany(){
		this.AdminService.getAllCompanyDetails().subscribe(result =>{
			 this.companyArr=result['response'];
			 this.cardArr[0].count=result['total'];
			 this.cardArr[1].count=result['total_active'];
			 this.cardArr[2].count=result['total_inactive'];
			 this.cardArr[3].count=result['total_deleted'];
		  },error=>{
				this.toastr.error(error.error.message,'Error!');
		  });
	}
	submitEditDetails(){
		if(!this.CompanyData.license_startdate || !this.CompanyData.license_enddate){
			  return this.toastr.error('Date are Required','Error');
		}
		let startdate=this.Dateformat.format(this.CompanyData.license_startdate);
		let enddate=this.Dateformat.format(this.CompanyData.license_enddate);
		if(startdate >= enddate){
			  return this.toastr.error('End date should be greater','Error');
		}
		let sendData={_id:this.CompanyData._id,
					  license_startdate:startdate,
					  license_enddate:enddate,
					  activestatus:this.CompanyData.activestatus };
		  this.AdminService.editCompany(sendData).subscribe(result =>{
				this.toastr.success(result.message,'Success');
				this.getCompany();
				this.modalService.dismissAll();
		  },error=>{
				this.toastr.error(error.error.message,'Error!');
		  });
	}
	
	deleteCompany(id){
	  let sendData={_id:id};
	  this.AdminService.deleteCompany(id).subscribe(result =>{
			this.toastr.success(result.message,'Success');
			this.getCompany();
	  },error=>{
			this.toastr.error(error.error.message,'Error!');
	  });
	}
	
	open(content,obj) {
	    this.CompanyData._id=obj._id;
		let startdate=obj.license_startdate.split("-");
		let enddate=obj.license_enddate.split("-");
	    this.CompanyData.license_startdate={ "year": parseInt(startdate[0]), "month": parseInt(startdate[1]), "day": parseInt(startdate[2])};
	    this.CompanyData.license_enddate={ "year": parseInt(enddate[0]), "month": parseInt(enddate[1]), "day": parseInt(enddate[2])};
		this.CompanyData.activestatus=obj.activestatus;
		this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }
	
	private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return  `with: ${reason}`;
        }
    }
	
	logOut(){
	  localStorage.removeItem('adminapikey');
	  this.router.navigate(['../admin/login']);
  }
}