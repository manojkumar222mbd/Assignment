import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
	ApiBaseUrl=environment.apiUrl;
	constructor(private http:HttpClient) { }
	
	registerNewCompany(data:any): Observable<any> {
		const httpOptions = {
		  headers: new HttpHeaders({
			'Content-Type':  'application/json'
		  })
		};
	  return this.http.post<any>(this.ApiBaseUrl+'/registercompany', data, httpOptions)
		.pipe(
		);
	}
	
	doLogin(data:any): Observable<any> {
	  const httpOptions = {headers: new HttpHeaders({'Content-Type':  'application/json',})};
	  return this.http.post<any>(this.ApiBaseUrl+'/login', data, httpOptions)
		.pipe(
		);
	}
	
	getLoginDetails(id:any): Observable<any> {
	  const httpOptions = {headers: new HttpHeaders({'Authorization':  `Bearer ${localStorage.getItem('clientapikey')}`})};
	  return this.http.get<any>(`${this.ApiBaseUrl}/getcompanydetails/${id}`, httpOptions)
		.pipe(
		);
	}
}