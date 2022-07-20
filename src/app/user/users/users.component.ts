import {Component, OnInit} from "@angular/core";
import {UserData} from "../dataModel/UserData";
import {UsersService} from "./users.Service";
import {map, tap} from "rxjs/operators";
import {PageEvent} from "@angular/material/paginator";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})

export class UsersComponent implements OnInit {

    dataSource: UserData = null as any;
    pageEvent!: PageEvent;
    displayedColumns: string[] = ['id', 'username', 'email', 'role'];

    constructor(private userService: UsersService,
                private route: Router,
                private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.initDataSource();
    }

    initDataSource() {
        this.userService.findAll(1, 10).pipe(
            tap(users => console.log(users)),
            map((userData: UserData) => this.dataSource = userData)
        ).subscribe();
    }

    onPaginateChange(event: PageEvent) {
        let page = event.pageIndex;
        let size = event.pageSize;

        page = page + 1;

        this.userService.findAll(page, size).pipe(
            map((userData: UserData) => this.dataSource = userData)
        ).subscribe();
    }

    navigateToUser(id) {
        this.route.navigate(['./' + id], {relativeTo: this.activatedRoute});
    }

}
