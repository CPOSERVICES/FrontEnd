import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import {  
  SidebarService,
  SharedService,
  SoporteService,
  UsuarioService,
  TecnicoService,
  LoginGuardsGuard,
  ModalSoporteService,
  MasterService
  
} from './service.index';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SidebarService,
    LoginGuardsGuard,
    SharedService,
    SoporteService,
    UsuarioService,
    TecnicoService,
    ModalSoporteService,
    MasterService
  ]
})
export class ServiceModule { }
