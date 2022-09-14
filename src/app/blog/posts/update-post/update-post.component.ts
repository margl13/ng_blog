import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PostsService} from "../services/posts.service";
import {catchError, first, map, switchMap, tap} from "rxjs/operators";
import {PostData} from "../dataModel/PostData";
import {BehaviorSubject, Observable, of} from "rxjs";
import {PostDto} from "../dataModel/PostDto";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {EditPostDto} from "../dataModel/EditPostDto";
import {HttpErrorResponse, HttpEventType} from "@angular/common/http";

export interface File {
    data: any;
    progress: number;
    inProgress: boolean;
}

@Component({
    selector: 'app-update-post',
    templateUrl: './update-post.component.html',
    styleUrls: ['./update-post.component.css']
})
export class UpdatePostComponent implements OnInit {


    @ViewChild("fileUpload", {static: false}) fileUpload!: ElementRef;


    file: File = {
        data: null,
        inProgress: false,
        progress: 0
    };

    form!: FormGroup;

    constructor(private formBuilder: FormBuilder,
                private postsService: PostsService,
                private route: ActivatedRoute,
                private router: Router
    ) {
    }


    ngOnInit(): void {
        this.form = this.formBuilder.group({
            id: [{value: null, disabled: true}],
            title: ['', [Validators.required]],
            subTitle: ['', [Validators.required]],
            imageUrl: ['', [Validators.required]],
            slug: [{value: null, disable: true}],
            content: ['', [Validators.required]]
        });

        this.route.paramMap.subscribe(
            params => {
                const postId = +params.get('id');
                if (postId) {
                    this.getPost(postId);
                }
            }
        )
    }

    getPost(id: number) {
        this.postsService.findOnePost(id).subscribe(
            (post: PostDto) => this.editPost(post),
            (err: any) => console.log(err)
        );
    }

    editPost(post: PostDto) {
        this.form.patchValue({
            id: post.id,
            title: post.title,
            subTitle: post.subTitle,
            imageUrl: post.imageUrl,
            slug: post.slug,
            content: post.content
        })
    }


    update() {
        this.postsService.edit(this.form.getRawValue()).pipe(
            tap(() => this.router.navigate(['./']))
        ).subscribe()

    }

    onClick() {
        const fileInput = this.fileUpload.nativeElement;
        fileInput.click();
        fileInput.onChange = () => {
            this.file = {
                data: fileInput.files[0],
                inProgress: false,
                progress: 0
            };
            this.fileUpload.nativeElement.value = '';
            this.uploadFile();
        }
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
