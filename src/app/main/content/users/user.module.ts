import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../../core/modules/shared.module';
import { UserListComponent } from './user-list/user-list.component';
import { UserService } from '../../../core/services/user.service';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogRef } from '@angular/material';
import { FuseConfirmDialogComponent } from '../../../core/components/confirm-dialog/confirm-dialog.component';
import { UserAddComponent } from './user-add/user-add.component';
import { CustomValidatorService } from '../../../core/services/unique-validator.service';
import { UserEditComponent } from './user-edit/user-edit.component';

const userRoutes: Routes = [
  {
    path: '',
    component: UserListComponent,
  }
];
@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(userRoutes)
  ],
  exports: [],
  declarations: [UserListComponent, UserAddComponent, UserEditComponent],
  entryComponents: [UserAddComponent, UserEditComponent],
  providers: [
    UserService,
    CustomValidatorService
  ],
})
export class UserModule { }
