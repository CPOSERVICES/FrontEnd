import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';




@NgModule({
    imports: [
        RouterModule,
        CommonModule
    ],
    declarations:[
       HeaderComponent,
        BreadcrumbComponent,
        SidebarComponent,
        NopagefoundComponent
    ],
    exports:[
        HeaderComponent,
        BreadcrumbComponent,
        SidebarComponent,
        NopagefoundComponent
    ]
})
export class SharedModule { }