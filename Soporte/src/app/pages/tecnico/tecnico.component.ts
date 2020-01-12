import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService, TecnicoService } from 'src/app/services/service.index';
import { Soporte } from 'src/app/models/soporte.model';

@Component({
  selector: 'app-tecnico',
  templateUrl: './tecnico.component.html',
  styles: []
})
export class TecnicoComponent implements OnInit {

  soportes: Soporte[] = [];
  usuario: any;
  idTecnico: number;

  constructor(
    public _usuario: UsuarioService,
    public _tecnico: TecnicoService,
    public activatedRoute: ActivatedRoute,
  ) { 
    this.usuario = this._usuario.getIdentity();
    this.idTecnico =  this.usuario[0].id;
  }

  ngOnInit() {
    this.cargarTicketsTecnico();
  }

   cargarTicketsTecnico() {
       this._tecnico.cargarTicketSoporteTecnico(this.idTecnico).subscribe((resp: any) => {
        this.soportes = resp.data
     });
   }

   

}
