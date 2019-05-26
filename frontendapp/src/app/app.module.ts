import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule,NgbCarouselModule, NgbAlertModule  } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';


//Component
import { AppComponent } from './app.component';
import { LoginComponent } from './company/login/login.component';
import { RegisterComponent } from './company/register/register.component';
import { DashboardComponent } from './company/dashboard/dashboard.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    AdminLoginComponent,
    AdminDashboardComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
	BrowserAnimationsModule,
    AppRoutingModule,
	NgbModule,
	FormsModule,
	NgbCarouselModule,
	NgbAlertModule,
	HttpClientModule,
	ToastrModule.forRoot({
		timeOut:10000,
		positionClass: 'toast-top-right',
		preventDuplicates: true
	})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
