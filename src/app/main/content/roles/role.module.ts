import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../../core/modules/shared.module';
import { UserService } from '../../../core/services/user.service';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogRef } from '@angular/material';
import { FuseConfirmDialogComponent } from '../../../core/components/confirm-dialog/confirm-dialog.component';
import { CustomValidatorService } from '../../../core/services/unique-validator.service';
import { RoleIndexComponent } from './role-index/role-index.component';

const userRoutes: Routes = [
  {
    path: '',
    component: RoleIndexComponent
  }
];
@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(userRoutes)
  ],
  exports: [],
  declarations: [RoleIndexComponent],
  entryComponents: [],
  providers: [
    UserService,
    CustomValidatorService
  ],
})
export class RoleModule { }
