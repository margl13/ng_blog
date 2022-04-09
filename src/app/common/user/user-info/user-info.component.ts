import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {UserDto} from "../dataModel/UserDto";
import {ActivatedRoute} from "@angular/router";
import {UsersService} from "../users/Users.Service";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-single-user',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit, OnDestroy {

    userId: number = null;
    private sub: Subscription;
    user: UserDto = null;

    constructor(
      private activatedRoute: ActivatedRoute,
      private usersService: UsersService
  ) { }

  ngOnInit(): void {
      this.sub = this.activatedRoute.params.subscribe(params => {
          this.userId = parseInt(params['id']);
          this.usersService.findOne(this.userId).pipe(
              map((user: UserDto) => this.user = user)
          ).subscribe()
      })
  }

  ngOnDestroy() {
      this.sub.unsubscribe();
  }
}
