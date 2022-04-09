import {NgModule} from '@angular/core';
import {PostListComponent} from "./post-list.component";
import {CommonModule} from "@angular/common";
import {CommonMaterialModules} from "../../../common/material/CommonMaterialModules";
import {RouterModule} from "@angular/router";

@NgModule({
    imports: [
        CommonModule,
        CommonMaterialModules,
        RouterModule

    ],
    exports: [
        PostListComponent
    ],
    declarations: [
        PostListComponent
    ],
    providers: [],
})
export class PostListModule {
}
