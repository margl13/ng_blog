import {Component, OnInit} from '@angular/core';
import {AuthService} from "../common/auth/services/authService";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {map} from "rxjs/operators";
import {comparePassword} from "./compare-password.validator";


@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    registerForm!: FormGroup;
    submitted = false;

    constructor(
        private authService: AuthService,
        private formBuilder: FormBuilder,
        private router: Router
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
                passwordConfirm: ['', [Validators.required]]
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
        this.submitted = true;

        if (this.registerForm.invalid) {
            return;
        }
        console.log(this.registerForm.value);
        this.authService.register(this.registerForm.value).pipe(
            map(user => this.router.navigate(['login']))
        ).subscribe()
    }
}

