import {NgModule} from '@angular/core';
import {PostListModule} from "./post-list/PostListModule";
import {CommonMaterialModules} from "../../common/material/CommonMaterialModules";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {PostsService} from "./services/posts.service";
import {SinglePostModule} from "./single-post/SinglePostModule";
import {CreatePostDialogComponent} from "./dialogs/create-post-dialog-component";




@NgModule({
    imports: [
        PostListModule,
        CommonMaterialModules,
        FormsModule,
        CommonModule,
        SinglePostModule
    ],
    exports: [
        PostListModule
    ],
    declarations: [CreatePostDialogComponent],
    entryComponents: [CreatePostDialogComponent],
    providers: [
    PostsService
    ],
})
export class PostsModule {
}


