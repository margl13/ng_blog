import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {PostsService} from "../services/posts.service";
import {BehaviorSubject, Observable} from "rxjs";
import {PostDto} from "../dataModel/PostDto";
import {finalize, map, switchAll, switchMap} from "rxjs/operators";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationDialogComponent} from "../../dialogs/confirmationDialogComponent";
import {MatSnackBar} from "@angular/material/snack-bar";
import * as _ from "lodash";
import {EditPostDto} from "../dataModel/EditPostDto";
import {CreatePostComponent} from "../createPost/create-post.component";


@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit {
    public isLoading = false;
    private postListSubject: BehaviorSubject<PostDto[]> = new BehaviorSubject<PostDto[]>([])

    postDto$: Observable<PostDto> = this.activatedRoute.params.pipe(
        switchMap((params: Params) => {
            const postId: number = parseInt(params['id']);
            return this.postsService.findOnePost(postId).pipe(
                map((postDto: PostDto) => postDto)
            )
        })
    )


  constructor(private activatedRoute: ActivatedRoute,
              private postsService: PostsService,
              private matDialog: MatDialog,
              private snackBar: MatSnackBar,
              private router: Router) { }

  ngOnInit(): void {
  }

    public getPostList(): Observable<PostDto[]> {
        return this.postListSubject.asObservable();
    }

     editPost(postId: number) {
        this.router.navigate(['/update-post', postId])
}


    public deletePost(postDto: PostDto) {
        const ref = this.matDialog.open(ConfirmationDialogComponent);

        ref.afterClosed().subscribe((canContinue) => {
            if (canContinue) {
                this.isLoading = true;
                this.postsService.delete(postDto.id)
                    .pipe(finalize(() => this.isLoading = false))
                    .subscribe(() => {
                        const list = this.postListSubject.getValue();
                        _.remove(list, post => post.id === postDto.id);
                        this.postListSubject.next(_.cloneDeep(list));

                        this.snackBar.open(`Post ${postDto.title} has been removed`, 'delete', {
                            duration: 2500,
                        });
                    });
            }
        });
    }

    navigateTo(value: any) {
        this.router.navigate(['../', value]);
    }

}
