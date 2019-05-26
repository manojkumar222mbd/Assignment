import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {

  constructor(private router: Router) {}

    canActivate() {
        if (localStorage.getItem('adminapikey')) {
            return true;
        }

        this.router.navigate(['/admin/login']);
        return false;
    }
}