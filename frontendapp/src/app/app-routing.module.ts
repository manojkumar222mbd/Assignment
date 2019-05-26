import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './company/login/login.component';
import { RegisterComponent } from './company/register/register.component';
import { DashboardComponent } from './company/dashboard/dashboard.component';

import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';

import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuardService } from './shared/guard/auth-guard.service';
import { AdminAuthGuardService } from './shared/guard/admin-auth-guard.service';


const routes: Routes = [
{path:"",component:LoginComponent},
{path:"login",component:LoginComponent},
{path:"register",component:RegisterComponent},
{path:"dashboard",component:DashboardComponent, canActivate: [AuthGuardService]},
{path:"admin",component:AdminLoginComponent},
{path:"admin/login",component:AdminLoginComponent},
{path:"admin/dashboard",component:AdminDashboardComponent, canActivate: [AdminAuthGuardService]},
{path:"**",component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }