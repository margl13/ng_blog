import { Component, OnInit } from '@angular/core';
import {PageEvent} from "@angular/material/paginator";
import {Observable} from "rxjs";
import {PostData} from "../../blog/posts/dataModel/PostData";
import {PostsService} from "../../blog/posts/services/posts.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

    posts$: Observable<PostData> = this.postsService.findAll(1, 10);

  constructor(private postsService: PostsService) { }

    onPaginateChange(event: PageEvent) {
this.posts$ = this.postsService.findAll(event.pageIndex, event.pageSize);
  }

}
