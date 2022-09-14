import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {UserDto} from "../dataModel/UserDto";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {UsersService} from "../services/users.Service";
import {map, switchMap, tap} from "rxjs/operators";
import {PostData} from "../../blog/posts/dataModel/PostData";
import {PostsService} from "../../blog/posts/services/posts.service";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-single-user',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent {

    private userId$: Observable<number> = this.activatedRoute.params.pipe(
        map((params: Params) => parseInt(params['id']))
    )

    user$: Observable<UserDto> = this.userId$.pipe(
        switchMap((userId: number) => this.usersService.findOne(userId))
    )

    posts$: Observable<PostData> = this.userId$.pipe(
        switchMap((userId: number) => this.postsService.findByUserId(userId, 1, 10))
    )

    constructor(
      private activatedRoute: ActivatedRoute,
      private usersService: UsersService,
    private postsService: PostsService,
  ) { }


onPaginateChange(event: PageEvent) {
return this.userId$.pipe(
    tap((userId: number) => this.posts$ = this.postsService.findByUserId(userId, event.pageIndex, event.pageSize))
).subscribe();
}


}
