import { RouterModule,Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { UsuarioComponent } from './usuario/usuario/usuario.component';
import { SoporteComponent } from './usuario/soporte/soporte.component';
import { SoporteEditComponent } from './usuario/soporte/soporte-edit.component';
import { SoportesComponent } from './usuario/soporte/soportes.component';
import { AsignarTecnicoComponent } from './master/asignar-tecnico/asignar-tecnico.component';
import { ListaSoporteComponent } from './master/lista-soporte/lista-soporte.component';
import { TecnicoComponent } from './tecnico/tecnico.component';
import { VerSoporteComponent } from './tecnico/ver-soporte.component';
import { LoginGuardsGuard } from '../services/service.index';
import { DashboardComponent } from './dashboard/dashboard.component';



const pagesRoutes: Routes = [
    { 
        path: '', 
        component: PagesComponent,
        canActivate: [LoginGuardsGuard],
        children: [
            { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Inicio' } },
            { path: 'soportes', component: SoportesComponent, data: { titulo: 'Listado de Ticket´s' } },
            { path: 'soporte/:id', component: SoporteComponent, data: { titulo: 'Visualizacion Ticket' } },
            { path: 'editar/:id', component: SoporteEditComponent, data: { titulo: 'Actualizar requerimiento Técnico' } },
            { path: 'usuario', component: UsuarioComponent, data: { titulo: 'Usuario' } },
            { path: 'usuario/:id', component: UsuarioComponent },

            //Master//
            { path: 'asignar/:id', component: AsignarTecnicoComponent, data: { titulo: 'Asignar Técnico' } },
            { path: 'listar', component: ListaSoporteComponent, data: { titulo: 'Lista de Soportes' } },
            
            //Tecnico//
            { path: 'tecnico', component: TecnicoComponent, data: { titulo: 'Lista de Soportes' } },
            { path: 'solicitud/:id', component: VerSoporteComponent, data: { titulo: 'Requerimento' } },

            { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
        ] 
    },
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );