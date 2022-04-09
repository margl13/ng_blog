import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../auth/services/AuthService";
import {UsersService} from "../users/Users.Service";
import {switchMap, tap} from "rxjs/operators";
import {UserDto} from "../dataModel/UserDto";

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

    form!: FormGroup

  constructor(
      private formBuilder: FormBuilder,
      private authService: AuthService,
      private usersService: UsersService
  ) { }

  ngOnInit(): void {
        this.form = this.formBuilder.group({
            id: [{value: null, disabled: true}, [Validators.required]],
            username: [null, [Validators.required]]
        });

        this.authService.getUserId().pipe(
            switchMap((id: number) => this.usersService.findOne(id).pipe(
                tap((user: UserDto) => {
                    this.form.patchValue({
                        id: user.id,
                        username: user.username
                    })
                })
            ))
        ).subscribe()
  }

  update() {
        this.usersService.updateOne(this.form.getRawValue()).subscribe();
  }

}
