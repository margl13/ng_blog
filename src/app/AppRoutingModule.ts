import {NgModule} from '@angular/core';
import {Routes, RouterModule} from "@angular/router";
import {LoginComponent} from "./login/loginComponent";
import {RegisterComponent} from "./register/register.component";
import {UsersComponent} from "./user/users/users.component";
import {UserInfoComponent} from "./user/user-info/user-info.component";
import {UpdateUserComponent} from "./user/update-user/update-user.component";
import {AuthGuard} from "./common/guards/auth-guard";
import {HomeComponent} from "./components/home/home.component";
import {SinglePostComponent} from "./blog/posts/single-post/single-post.component";
import {CreatePostComponent} from "./blog/posts/createPost/create-post.component";
import {UpdatePostComponent} from "./blog/posts/update-post/update-post.component";

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
    },
    {
        path: 'create-post',
        component: CreatePostComponent
    },
    {
        path: 'update-post/:id',
        component: UpdatePostComponent,
        canActivate: [AuthGuard]
    }

    ];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
