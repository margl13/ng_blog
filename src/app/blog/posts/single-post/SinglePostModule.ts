import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SinglePostComponent} from "./single-post.component";
import {CommonMaterialModules} from "../../../common/material/CommonMaterialModules";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [SinglePostComponent],
  exports: [SinglePostComponent],
    imports: [
        CommonModule,
        CommonMaterialModules,
        RouterModule
    ]
})
export class SinglePostModule { }
