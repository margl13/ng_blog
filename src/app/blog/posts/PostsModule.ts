import {NgModule} from '@angular/core';
import {PostListModule} from "./post-list/PostListModule";
import {CommonMaterialModules} from "../../common/material/CommonMaterialModules";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {PostsService} from "./services/posts.service";
import {SinglePostModule} from "./single-post/SinglePostModule";
import {CreatePostComponent} from "./createPost/create-post.component";
import {UpdatePostModule} from "./update-post/UpdatePostModule";



@NgModule({
    imports: [
        PostListModule,
        CommonMaterialModules,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        SinglePostModule,
        UpdatePostModule
    ],
    exports: [
        PostListModule
    ],
    declarations: [CreatePostComponent],
    entryComponents: [CreatePostComponent],
    providers: [
    PostsService
    ],
})
export class PostsModule {
}


