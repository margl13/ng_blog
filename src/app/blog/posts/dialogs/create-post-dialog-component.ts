import {Component, Inject, OnInit} from "@angular/core";
import {CreatePostDto} from "../dataModel/CreatePostDto";
import {EditPostDto} from "../dataModel/EditPostDto";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PostsService} from "../services/posts.service";
import * as _ from "lodash";
import {NgForm} from "@angular/forms";
import {PostDto} from "../dataModel/PostDto";
import {Observable} from "rxjs";
import {finalize} from "rxjs/operators";

@Component({
    selector: 'app-create-post-dialog',
    templateUrl: 'create-post-dialog-component.html'
})

export class CreatePostDialogComponent implements OnInit {
    public postModel: CreatePostDto | EditPostDto = {} as CreatePostDto;
    public isLoading = false;
    public isEditing = false;

    constructor(private dialogRef: MatDialogRef<CreatePostDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: { editPostDto: EditPostDto },
                private postsService: PostsService) {
    }

    ngOnInit(): void {
        this.isEditing = !!_.get(this.data, 'editPostDto');
        if (this.isEditing) {
            this.postModel = _.clone(this.data.editPostDto);
        }
    }

    public submit(form: NgForm) {
        if (form.valid) {
            this.isLoading = true;
            this.handleAfterSubmit(
                this.isEditing ?
                    this.postsService.edit(this.postModel as EditPostDto) :
                    this.postsService.createPost(this.postModel)
            );

        }
    }

    private handleAfterSubmit(observable: Observable<PostDto>) {
        return observable
            .pipe(finalize(() => this.isLoading = false))
            .subscribe((response) => {
                this.dialogRef.close(response);
            });
    }
}
