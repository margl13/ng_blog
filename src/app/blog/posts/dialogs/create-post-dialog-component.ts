import {Component, ElementRef, Inject, OnInit, ViewChild} from "@angular/core";
import {CreatePostDto} from "../dataModel/CreatePostDto";
import {EditPostDto} from "../dataModel/EditPostDto";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PostsService} from "../services/posts.service";
import * as _ from "lodash";
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {PostDto} from "../dataModel/PostDto";
import {Observable, of} from "rxjs";
import {catchError, finalize, map, tap} from "rxjs/operators";
import {Router} from "@angular/router";
import {HttpErrorResponse, HttpEventType} from "@angular/common/http";


export interface File {
    data: any;
    progress: number;
    inProgress: boolean;
}

@Component({
    selector: 'app-create-post-dialog',
    templateUrl: './create-post-dialog-component.html',
    styleUrls: ['./create-post-dialog-component.scss']
})

export class CreatePostDialogComponent implements OnInit {

    public postModel: CreatePostDto | EditPostDto = {} as CreatePostDto;
    public isEditing = false;
    public isLoading = false;

    @ViewChild("fileUpload", {static: false}) fileUpload!: ElementRef;


    file: File = {
        data: null,
        inProgress: false,
        progress: 0
    };

    form!: FormGroup;

    constructor(private dialogRef: MatDialogRef<CreatePostDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: { editPostDto: EditPostDto },
                private postsService: PostsService,
                private formBuilder: FormBuilder,
                private router: Router) {
    }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            id: [{value: null, disabled: true}],
            title: ['', [Validators.required]],
            subTitle: ['', [Validators.required]],
            imageUrl: ['', [Validators.required]],
            content: ['', [Validators.required]]
        });
        this.isEditing = !!_.get(this.data, 'editPostDto');
        if (this.isEditing) {
            this.postModel = _.clone(this.data.editPostDto);
        }
    }


    post() {
        this.isLoading = true;
        this.handleAfterSubmit(
            this.isEditing ?
                this.postsService.edit(this.form.getRawValue()) :
                this.postsService.create(this.form.getRawValue())
        );
    }

    private handleAfterSubmit(observable: Observable<PostDto>) {
        return observable
            .pipe(finalize(() => this.isLoading = false))
            .subscribe((response) => {
                this.dialogRef.close(response);
            });
    }

    onClick() {
        const fileInput = this.fileUpload.nativeElement;
        fileInput.click();
        fileInput.onchange = () => {
            this.file = {
                data: fileInput.files[0],
                inProgress: false,
                progress: 0
            };
            this.fileUpload.nativeElement.value = '';
            this.uploadFile();
        };
    }

    uploadFile() {
        const formData = new FormData();
        formData.append('file', this.file.data);
        this.file.inProgress = true;

        this.postsService.uploadImage(formData).pipe(
            map((event) => {
                switch (event.type) {
                    case HttpEventType.UploadProgress:
                        this.file.progress = Math.round(event.loaded * 100 / event.total);
                        break;
                    case HttpEventType.Response:
                        return event;
                }
            }),
            catchError((error: HttpErrorResponse) => {
                this.file.inProgress = false;
                return of('Upload filed');
            })).subscribe((event: any) => {
            if (typeof (event) === 'object') {
                console.log(event.body);
                this.form.patchValue({imageUrl: event.body.filename});
            }
        })
    }
}
