import { Component, OnInit } from '@angular/core';
import { UsuarioService, SoporteService, MasterService } from 'src/app/services/service.index';
import { Soporte } from 'src/app/models/soporte.model';

@Component({
  selector: 'app-lista-soporte',
  templateUrl: './lista-soporte.component.html',
  styles: []
})
export class ListaSoporteComponent implements OnInit {

  soportes: Soporte[] = [];
  soportesA: Soporte[] = [];
  usuario: any;
  
  constructor(
    public _usuario: UsuarioService,
    public _soporte: SoporteService,
    public _master: MasterService
  ) {
    this.usuario = this._usuario.getIdentity();
   }

  ngOnInit() {
    this.cargarListaSoporte();
    this.cargarTicketRevision()
  }

  cargarListaSoporte() {
    this._soporte.listarSoportes().subscribe((resp: any) => {
      this.soportes = resp.soportes; 
      console.log(this.soportes)  
    });
  }

  cargarTicketRevision(){
    this._master.cargarTicketsRevisando().subscribe( (resp: any) =>{
      this.soportesA = resp.soportes; 
      console.log(this.soportesA)  
    })
  }

  



}
