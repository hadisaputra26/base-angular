import { Store } from '@ngrx/store';
import { FuseConfirmDialogComponent } from './../../../../core/components/confirm-dialog/confirm-dialog.component';
import { UserService } from './../../../../core/services/user.service';
import { Observable } from 'rxjs/Observable';
import { User } from './../user.model';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { FuseConfigService } from './../../../../core/services/config.service';
import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, EventEmitter } from '@angular/core';
import { fuseAnimations } from '../../../../core/animations';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatDialogRef } from '@angular/material';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { ApiResponse } from '../../../../core/types/ApiResponse';
import { UserAddComponent } from '../user-add/user-add.component';
import { UserEditComponent } from '../user-edit/user-edit.component';

import * as fromRoot from "../../../../core/reducers";
import { JwtHelperService } from "@auth0/angular-jwt";
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  animations: fuseAnimations
})
export class UserListComponent implements OnInit, AfterViewInit {
  isRateLimitReached: boolean;
  isLoadingResults: boolean;
  displayedColumns = ['no', 'name', 'email', 'phone', 'action'];
  resultsLength = 0;
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('filter') filter: ElementRef;
  @ViewChild(MatSort) sort: MatSort;

  eventFilter: Observable<{}>;
  eventDialogClosed;

  constructor(
    private fuseConfig: FuseConfigService,
    private userService: UserService,
    private dialog: MatDialog,
    private jwtHelper: JwtHelperService
  ) {
    this.fuseConfig.setSettings({
      layout: {
        navigation: 'left',
        toolbar: 'below',
        footer: 'none',
      }
    });
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.eventFilter = Observable.fromEvent(this.filter.nativeElement, 'keyup')
      .debounceTime(150)
      .distinctUntilChanged();

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    const observable = Observable.merge(this.sort.sortChange, this.paginator.page, this.eventFilter)
      .startWith(null);
    this.getData(observable);

  }

  onDeleteClick(user) {
    const confirmDialog = this.dialog.open(FuseConfirmDialogComponent, {
      width: '250px',
      data: {
        confirmMessage: "Apakah anda yakin ?"
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if (result) {
        const observable = this.userService.delete(user.id);
        this.getData(observable);
      }
    });
  }

  onEditClick(user) {
    const editDialog = this.dialog.open(UserEditComponent, {
      width: '500px',
      data: {
        user: user
      }
    });
    const observable = editDialog.afterClosed();
    this.getData(observable);
  }

  onAddClick() {
    const addDialog = this.dialog.open(UserAddComponent, {
      width: '500px'
    });

    const observable = addDialog.afterClosed();
    this.getData(observable);
  }

  onRowCLick() {

  }

  getData(observable) {
    observable.switchMap(() => {
      setTimeout(() => {
        this.isLoadingResults = true;
      });
      const offset = this.paginator.pageIndex * this.paginator.pageSize;
      return this.userService.getAll(this.sort.active, this.sort.direction, offset, this.paginator.pageSize, this.filter.nativeElement.value);
    })
      .catch(() => {
        setTimeout(() => {
          this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
        });
        return Observable.of([]);
      })
      .subscribe(data => {
        this.resultsLength = data.data.count;
        this.dataSource.data = data.data.rows;
      });
  }

}
