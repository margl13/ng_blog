import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../common/auth/services/authService";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {catchError, map} from "rxjs/operators";
import {comparePassword} from "./compare-password.validator";
import {HttpErrorResponse, HttpEventType} from "@angular/common/http";
import {of} from "rxjs";
import {UsersService} from "../user/services/users.Service";

export interface File {
    data: any;
    progress: number;
    inProgress: boolean;
}

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    @ViewChild("fileUpload", {static: false}) fileUpload!: ElementRef;

    file: File = {
        data: null,
        inProgress: false,
        progress: 0
    };

    registerForm!: FormGroup;
    submitted = false;

    constructor(
        private authService: AuthService,
        private formBuilder: FormBuilder,
        private router: Router,
        private usersService: UsersService
    ) {
    }

    ngOnInit(): void {
        this.registerForm = this.formBuilder.group({
                username: ['', [Validators.required]],
                email: ['', [
                    Validators.required,
                    Validators.minLength(6),
                    Validators.email
                ]],
                password: ['', [
                    Validators.required,
                    Validators.minLength(3)
                ]],
                passwordConfirm: ['', [Validators.required]],
            profileImage:['', [Validators.required]]
            },
            {
                validator: comparePassword('password', 'passwordConfirm')
            }
        );
    }

    get form() {
        return this.registerForm.controls;
    }

    onSubmit() {
        console.log(this.registerForm.value)
        this.usersService.register(this.registerForm.value).pipe(
            map(user => this.router.navigate(['login']))
        ).subscribe()
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
                this.registerForm.patchValue({profileImage: event.body.filename});
            }
        })
    }


}

