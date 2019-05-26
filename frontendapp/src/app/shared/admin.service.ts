import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  ApiBaseUrl=environment.apiUrl;
  constructor(private http:HttpClient) { }
   
	  getAllCompanyDetails() {
		  const httpOptions = {
		  headers: new HttpHeaders({'Authorization': `Bearer ${localStorage.getItem('adminapikey')}`})
		};
		  return this.http.get(this.ApiBaseUrl+'/admin/getallcompany',httpOptions).pipe();
	  }
    editCompany(data:any): Observable<any> {
		const httpOptions = {
		  headers: new HttpHeaders({
			'Content-Type':  'application/json',
			'Authorization': `Bearer ${localStorage.getItem('adminapikey')}`
		  })
		};
	  return this.http.put<any>(this.ApiBaseUrl+'/admin/editcompany', data, httpOptions)
		.pipe(
		);
	}
	
	deleteCompany(id:any): Observable<any> {
		const httpOptions = {
		  headers: new HttpHeaders({
			'Content-Type':  'application/json',
			'Authorization': `Bearer ${localStorage.getItem('adminapikey')}`
		  })
		};
	  return this.http.delete<any>(this.ApiBaseUrl+'/admin/deletecompany/'+id, httpOptions)
		.pipe(
		);
	}
	
	doAdminLogin(data:any): Observable<any> {
	  const httpOptions = {headers: new HttpHeaders({'Content-Type':  'application/json',})};
	  return this.http.post<any>(this.ApiBaseUrl+'/admin/login', data, httpOptions)
		.pipe(
		);
	}
}
