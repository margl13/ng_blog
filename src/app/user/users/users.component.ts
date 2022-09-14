import {Component, OnInit} from "@angular/core";
import {UserData} from "../dataModel/UserData";
import {UsersService} from "../services/users.Service";
import {map} from "rxjs/operators";
import {PageEvent} from "@angular/material/paginator";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})

export class UsersComponent implements OnInit {

    value!: string;
    dataSource!: UserData;
    pageEvent!: PageEvent;
    displayedColumns: string[] = ['id', 'username', 'profileImage', 'email', 'role'];

    constructor(private userService: UsersService,
                private router: Router,
                private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.initDataSource();
    }

    initDataSource() {
        this.userService.findAll(1, 10).pipe(
            map((userData: UserData) => this.dataSource = userData)
        ).subscribe();
    }

    onPaginateChange(event: PageEvent) {
        let page = event.pageIndex;
        let size = event.pageSize;

        if (this.value == null) {
            page = page + 1;

            this.userService.findAll(page, size).pipe(
                map((userData: UserData) => this.dataSource = userData)
            ).subscribe();
        } else {
            this.userService.paginateByUserName(page, size, this.value).pipe(
                map((userData: UserData) => this.dataSource = userData)
            ).subscribe();

        }

    }

    navigateToUser(id: string) {
        this.router.navigate(['./' + id], {relativeTo: this.activatedRoute});
    }

    findByUsername(username: string) {
        this.userService.paginateByUserName(0, 10, username).pipe(
            map((userdata: UserData) => this.dataSource = userdata)
        ).subscribe();
    }

}
