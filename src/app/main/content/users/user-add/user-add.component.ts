import { CustomValidatorService } from './../../../../core/services/unique-validator.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../user.model';
import { UserService } from '../../../../core/services/user.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {

  form: FormGroup;
  loading: boolean;

  constructor(
    public dialogRef: MatDialogRef<UserAddComponent>,
    private userService: UserService,
    private snackbar: MatSnackBar,
    private customValidator: CustomValidatorService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'username': new FormControl(null, [Validators.required], [this.customValidator.uniqueValidator('users', 'username')]),
      'password': new FormControl(null, [Validators.required]),
      'email': new FormControl(null,
        [Validators.required, Validators.email],
        [this.customValidator.uniqueValidator('users', 'email')]),
      'phone': new FormControl(null, [Validators.required]),
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const user = new User();
      user.name = this.form.value.name;
      user.email = this.form.value.email;
      user.username = this.form.value.username;
      user.password = this.form.value.password;
      user.phone = this.form.value.phone;
      user.role_id = 1;
      this.loading = true;
      this.userService.create(user).subscribe(user => {
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
