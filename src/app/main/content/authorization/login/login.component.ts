import { getUser } from './../../../../core/reducers/index';
import { Observable } from 'rxjs/Observable';
import { UserService } from './../../../../core/services/user.service';
import { FuseConfigService } from './../../../../core/services/config.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { fuseAnimations } from '../../../../core/animations';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromRoot from "../../../../core/reducers";
import { UserChangeAction } from '../../../../core/reducers/user.actions';
import { User } from '../../users/user.model';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: fuseAnimations
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginFormErrors: any;
  public user$: Observable<User>;

  constructor(
    private fuseConfig: FuseConfigService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private snackbar: MatSnackBar,
    private router: Router,
    public store: Store<fromRoot.State>
  ) {
    this.fuseConfig.setSettings({
      layout: {
        navigation: 'none',
        toolbar: 'none',
        footer: 'none',
      }
    });

    this.loginFormErrors = {
      email: {},
      password: {}
    };

    this.user$ = store.select(fromRoot.getUser);
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.loginForm.valueChanges.subscribe(() => {
      this.onLoginFormValuesChanged();
    });
    this.user$.subscribe(user => {
      console.log(user);
    })
  }

  onLoginFormValuesChanged() {
    for (const field in this.loginFormErrors) {
      if (!this.loginFormErrors.hasOwnProperty(field)) {
        continue;
      }

      // Clear previous errors
      this.loginFormErrors[field] = {};

      // Get the control
      const control = this.loginForm.get(field);

      if (control && control.dirty && !control.valid) {
        this.loginFormErrors[field] = control.errors;
      }
    }
  }

  onSubmit() {
    this.userService.signin(this.loginForm.value).subscribe(response => {
      localStorage.setItem('base-api:token', response.meta.token);
      localStorage.setItem('base-api:refresh_token', response.meta.refresh_token);
      this.router.navigate(['/']);
    }, err => {
      this.snackbar.open("Email / Password yang Anda masukkan salah", null, {
        duration: 2000,
        panelClass: ['mat-warn-bg']
      });
    });
  }

}
