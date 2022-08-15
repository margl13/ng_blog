import {Component, OnInit} from '@angular/core';
import {UserLogin} from "../user/dataModel/UserLogin";
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {AuthService} from "../common/auth/services/authService";
import {finalize, map} from "rxjs/operators";
import {Router} from "@angular/router";

@Component({
    selector: 'app-login',
    templateUrl: 'loginComponent.html',
    styleUrls: ['./loginComponent.scss']
})

export class LoginComponent implements OnInit{

    loginForm!: FormGroup;
    public isLoading = false;

    constructor(private authService: AuthService,
                private formBuilder: FormBuilder,
                private readonly router: Router) { }

    ngOnInit(): void {
        this.loginForm = new FormGroup({
            email: new FormControl(null, [
                Validators.required,
                Validators.minLength(6),
                Validators.email
            ]),
            password: new FormControl(null, [
                Validators.required,
                Validators.minLength(3)
            ])
        })
    }

    onSubmit() {
        if(this.loginForm.invalid) {
            return;
        }
        this.authService.login(this.loginForm.value).pipe(
            finalize(() => this.isLoading = false))
            .subscribe(() => this.router.navigate(['admin']))

    }
}
