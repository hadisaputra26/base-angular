import { CustomValidatorService } from './../../../../core/services/unique-validator.service';
import { UserService } from './../../../../core/services/user.service';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { User } from '../user.model';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  form: FormGroup;
  loading: boolean;
  user: User;

  constructor(
    public dialogRef: MatDialogRef<UserEditComponent>,
    private userService: UserService,
    private snackbar: MatSnackBar,
    private customValidator: CustomValidatorService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.user = this.data.user;
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = new FormGroup({
      'name': new FormControl(this.user.name, [Validators.required]),
      'username': new FormControl(this.user.username, [Validators.required], [this.customValidator.uniqueValidator('users', 'username', this.user.id)]),
      'password': new FormControl(null),
      'email': new FormControl(this.user.email,
        [Validators.required, Validators.email],
        [this.customValidator.uniqueValidator('users', 'email', this.user.id)]),
      'phone': new FormControl(this.user.phone, [Validators.required]),
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.user.name = this.form.value.name;
      this.user.email = this.form.value.email;
      this.user.username = this.form.value.username;
      this.user.password = this.form.value.password;
      this.user.phone = this.form.value.phone;
      this.user.role_id = 1;
      this.loading = true;
      this.userService.update(this.user).subscribe(user => {
        this.dialogRef.close(true);
        this.loading = false;
      }, err => {
        this.snackbar.open("Data gagal disimpan", null, {
          duration: 2000,
          panelClass: ['mat-warn-bg']
        });
        this.loading = false;
      });
    } else {
      this.snackbar.open("Form tidak valid", null, {
        duration: 2000,
        panelClass: ['mat-warn-bg']
      });
    }
  }
}
