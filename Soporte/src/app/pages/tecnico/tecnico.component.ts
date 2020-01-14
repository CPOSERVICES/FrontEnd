import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService, TecnicoService, SoporteService } from 'src/app/services/service.index';
import { Soporte } from 'src/app/models/soporte.model';
import { Comentarios } from 'src/app/models/comentarios.model';

@Component({
  selector: 'app-tecnico',
  templateUrl: './tecnico.component.html',
  styles: []
})
export class TecnicoComponent implements OnInit {

  soportes: Soporte[] = [];
  usuario: any;
  idTecnico: number;
  cargandoTicket: boolean = false;
  

  constructor(
    public _usuario: UsuarioService,
    public _tecnico: TecnicoService,
    public _soporte: SoporteService,
    public activatedRoute: ActivatedRoute,
  ) { 
    this.usuario = this._usuario.getIdentity();
    this.idTecnico =  this.usuario[0].id;
  }

  ngOnInit() {
    this.cargarTicketsTecnico();

  }

   cargarTicketsTecnico() {
     console.log(this.idTecnico)
       this._tecnico.cargarTicketSoporteTecnico(this.idTecnico).subscribe((resp: any) => {
        this.soportes = resp.data
        console.log('asdasd',this.soportes);
        if( this.soportes.length == 0){
          this.cargandoTicket = false;
        } else {
          this.cargandoTicket = true;
        }
     });
   }


   

}
