import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../common/auth/services/authService";
import {UsersService} from "../services/users.Service";
import {catchError, map, switchMap, tap} from "rxjs/operators";
import {UserDto} from "../dataModel/UserDto";
import {HttpErrorResponse, HttpEvent, HttpEventType} from "@angular/common/http";
import {of} from "rxjs";

export interface File {
    data: any;
    progress: number;
    inProgress: boolean;
}


@Component({
    selector: 'app-update-user',
    templateUrl: './update-user.component.html',
    styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

    @ViewChild("fileUpload", {static: false}) fileUpload!: ElementRef;

    file: File = {
        data: null,
        inProgress: false,
        progress: 0
    };

    form!: FormGroup

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private usersService: UsersService
    ) {
    }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            id: [{value: null, disabled: true}, [Validators.required]],
            username: [null, [Validators.required]],
            profileImage: [null]
        });

        this.authService.getIdOfUser().pipe(
            switchMap((id: number) => this.usersService.findOne(id).pipe(
                tap((user: UserDto) => {
                    this.form.patchValue({
                        id: user.id,
                        username: user.username,
                        profileImage: user.profileImage
                    })
                })
            ))
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

        this.usersService.uploadProfileImage(formData).pipe(
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
                this.form.patchValue({profileImage: event.body.profileImage});
            }
        })
    }


    update() {
       this.usersService.updateOne(this.form.getRawValue()) .subscribe();
    }

}
