import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {finalize, map} from "rxjs/operators";
import * as _ from "lodash";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {PostDto} from "../dataModel/PostDto";
import {PostsService} from "../services/posts.service";
import {EditPostDto} from "../dataModel/EditPostDto";
import {ConfirmationDialogComponent} from "../../dialogs/confirmationDialogComponent";
import {CreatePostComponent} from "../createPost/create-post.component";
import {PostData} from "../dataModel/PostData";
import {PageEvent} from "@angular/material/paginator";
import {Router} from "@angular/router";


@Component({
    selector: 'app-post-list',
    templateUrl: 'post-list.component.html',
    styleUrls: ['post-list.component.scss']
})

export class PostListComponent {

    @Input() posts!: PostData;
    @Output() paginate: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();

    public isLoading = false;
    public displayedColumns: string[] = ['id', 'title', 'subTitle', 'imageUrl', 'author'];

    pageEvent!: PageEvent;
    value!: string;

    constructor(private postsService: PostsService,
                private snackBar: MatSnackBar,
                private matDialog: MatDialog,
                private router: Router) {
    }

    onPaginateChange(event: PageEvent) {
        event.pageIndex = event.pageIndex + 1;
        this.paginate.emit(event);
    }

    navigateTo(value: any) {
        this.router.navigate(['../', value]);
    }

    navigate(id: string) {
        this.router.navigateByUrl('posts/' + id)
    }

}


