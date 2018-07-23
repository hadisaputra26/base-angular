import { SharedModule } from './../../../core/modules/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { UserService } from '../../../core/services/user.service';

const authRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(authRoutes),
  ],
  exports: [],
  declarations: [LoginComponent],
  providers: [
    UserService
  ],
})
export class AuthorizationModule { }
