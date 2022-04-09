import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {PostsService} from "../services/posts.service";
import {Observable} from "rxjs";
import {PostDto} from "../dataModel/PostDto";
import {map, switchAll, switchMap} from "rxjs/operators";

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit {

    postDto$: Observable<PostDto> = this.activatedRoute.params.pipe(
        switchMap((params: Params) => {
            const postId: number = parseInt(params['id']);
            return this.postsService.findOnePost(postId).pipe(
                map((postDto: PostDto) => postDto)
            )
        })
    )


  constructor(private activatedRoute: ActivatedRoute,
              private postsService: PostsService) { }

  ngOnInit(): void {
  }

}
