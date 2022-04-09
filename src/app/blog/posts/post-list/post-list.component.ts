import {CreatePostDialogComponent} from "../dialogs/create-post-dialog-component";
import {PostDto} from "../dataModel/PostDto";
import {Component, OnInit} from "@angular/core";
import {BehaviorSubject, Observable, ReplaySubject} from "rxjs";
import {PostsService} from "../services/posts.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {finalize} from "rxjs/operators";
import {EditPostDto} from "../dataModel/EditPostDto";
import {ConfirmationDialogComponent} from "../../dialogs/ConfirmationDialogComponent";
import * as _ from "lodash";

@Component({
    selector: 'app-post-list',
    templateUrl: 'post-list.component.html',
    styleUrls: ['post-list.component.scss']
})

export class PostListComponent implements OnInit {
    public isLoading = false;
    public displayedColumns: string[] = ['id', 'title', 'subTitle', 'imageUrl', 'author', 'view post', 'edit post', 'action'];

    private postListSubject: BehaviorSubject<PostDto[]> = new BehaviorSubject<PostDto[]>([])

    constructor(private postsService: PostsService,
                private snackBar: MatSnackBar,
                private matDialog: MatDialog) {
    }

    ngOnInit() {
        this.isLoading = true;
        this.postsService.findAll()
            .pipe(finalize(() => this.isLoading = false))
            .subscribe((postListItems) => this.postListSubject.next(postListItems));
    }

    public getPostList(): Observable<PostDto[]> {
        return this.postListSubject.asObservable();
    }

    public editPost(editPost: EditPostDto) {
        const ref = this.matDialog.open(CreatePostDialogComponent, {
            width: '600px',
            data: {editPostDto: editPost}
        });

        ref.afterClosed().subscribe((editedPost: PostDto) => {
            if (editedPost) {
                const list = this.postListSubject.getValue();
                const postIndex = _.findIndex(list, post => post.id === editedPost.id);
                list[postIndex] = editedPost;

                this.postListSubject.next(_.cloneDeep(list));
            }
        });
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

    public createPost() {
        const ref = this.matDialog.open(CreatePostDialogComponent, {
            width: '600px',
        });

        ref.afterClosed().subscribe((newPost: PostDto) => {
            if (newPost) {
                const list = this.postListSubject.getValue();
                list.push(newPost);
                this.postListSubject.next(_.cloneDeep(list));

                this.snackBar.open(`Post ${newPost.title} has been created`, 'create' , {
                    duration: 2500,
                });
            }
        });
    }
}
