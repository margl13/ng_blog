import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {UserDto} from "../dataModel/UserDto";
import {ActivatedRoute, Router} from "@angular/router";
import {UsersService} from "../services/users.Service";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-single-user',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit, OnDestroy {

    userId: number = null as any;
    private sub?: Subscription;
    user: UserDto = null as any;

    constructor(
      private activatedRoute: ActivatedRoute,
      private usersService: UsersService,
    private router: Router
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
      this.sub?.unsubscribe();
  }

    navigateTo(value: any) {
        this.router.navigate(['../', value]);
    }
}
