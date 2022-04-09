import {NgModule} from '@angular/core';
import {Routes, RouterModule} from "@angular/router";
import {LoginComponent} from "./components/login/LoginComponent";
import {RegisterComponent} from "./components/register/register.component";
import {UsersComponent} from "./common/user/users/Users.component";
import {UserInfoComponent} from "./common/user/user-info/user-info.component";
import {UpdateUserComponent} from "./common/user/update-user/update-user.component";
import {AuthGuard} from "./common/guards/auth-guard";
import {HomeComponent} from "./components/home/home.component";
import {SinglePostComponent} from "./blog/posts/single-post/single-post.component";

const routes: Routes = [
    {
        path: 'admin',
        loadChildren: () => import('./admin/AdminModule').then(m => m.AdminModule)
    },
    {
       path: 'login' ,
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'users',
        children: [
            {
                path: '',
                component: UsersComponent
            },
            {
                path: ':id',
                component: UserInfoComponent
            },
        ]
    },
    {
        path: 'update-user',
        component: UpdateUserComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'posts/:id',
        component: SinglePostComponent
    },
    {
        path: 'home',
        component: HomeComponent

    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    }

    ];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
