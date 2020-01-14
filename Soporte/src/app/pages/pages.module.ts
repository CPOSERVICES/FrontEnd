import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { PAGES_ROUTES } from './pages.routes';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';


import { PagesComponent } from './pages.component';
import { UsuarioComponent } from './usuario/usuario/usuario.component';
import { SoporteComponent } from './usuario/soporte/soporte.component';
import { SoportesComponent } from './usuario/soporte/soportes.component';
import { ModalSoporteComponent } from '../components/modal-soporte/modal-soporte.component';
import { SoporteEditComponent } from './usuario/soporte/soporte-edit.component';
import { TecnicoComponent } from './tecnico/tecnico.component';
import { AsignarTecnicoComponent } from './master/asignar-tecnico/asignar-tecnico.component';
import { ListaSoporteComponent } from './master/lista-soporte/lista-soporte.component';
import { VerSoporteComponent } from './tecnico/ver-soporte.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ComentariosComponent } from './master/comentarios/comentarios.component';
import { CorreoComponent } from './correo/correo.component';



  


@NgModule({
    declarations:[
        PagesComponent,
        UsuarioComponent,
        SoporteComponent,
        SoportesComponent,
        ModalSoporteComponent,
        SoporteEditComponent,
        TecnicoComponent,
        AsignarTecnicoComponent,
        ListaSoporteComponent,
        VerSoporteComponent,
        DashboardComponent,
        ComentariosComponent,
        CorreoComponent
    ],
    exports:[
        UsuarioComponent,
        SoporteComponent,
        SoportesComponent,
        DashboardComponent,
        ComentariosComponent

    ],
    imports: [
        CommonModule,
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        HttpClientModule
    ]
})
export class PagesModule { }