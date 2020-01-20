import { Component, OnInit, NgZone } from "@angular/core";
import {
  SoporteService,
  UsuarioService,
  MasterService
} from "../../../services/service.index";
import { Soporte } from "src/app/models/soporte.model";

import { ActivatedRoute, Router } from "@angular/router";
import { Comentario } from 'src/app/models/soporteComentarios.model';
import Swal from 'sweetalert2';
import { Comentarios } from 'src/app/models/comentarios.model';
import { Tecnico } from 'src/app/models/tecnico.model';

@Component({
  selector: "app-soporte",
  templateUrl: "./soporte.component.html",
  styles: []
})
export class SoporteComponent implements OnInit {
  soporte: Soporte;
  comentario: Comentario
  usuario: any;
  comentarios: Comentarios[] = [];
  tecnico: Tecnico;
  quejas:boolean = false;
  tablaCometarios: boolean = false; 

  constructor(
    public _soporte: SoporteService,
    public _usuario: UsuarioService,
    public _master: MasterService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    
  ) {
    this.usuario = this._usuario.getIdentity();
    this.soporte = new Soporte("", "", 0, this.usuario[0].id, 2);
    this.comentario = new Comentario(0,0,'',0,0);
    this.tecnico = new Tecnico();
  }

  ngOnInit() {
    this.cargarTicket();
    this.listadoCometarios();
    this.obtenerTecnicoAsignado();
    //this.enviarMail();
  }

  cargarTicket() {
    this.activatedRoute.params.subscribe(params => {
      var id = +params["id"];
      this._soporte.cargarTicketSoporte(id).subscribe((resp: any) => {
        this.soporte = resp.soporte[0];
      });
    });
  }

  requerimientoSolucionado(){
    this.soporte = new Soporte( this.soporte.sp_titulo, this.soporte.sp_detalle, this.soporte.sp_id, this.soporte.sp_usuario, 6);
    this._soporte.actualizaTicket(this.soporte).subscribe( resp =>{
      Swal.fire({
        icon: "success",
        title: "Inconveniente Solucionado ",
        text: 'Su inconveniente a sido solucionado Satisfactoriamente',
        showConfirmButton: false,
        timer: 1500
      });
      this.router.navigate(['/soportes']);
    })
  }

  nuevoRequerimento(forma){
    this.soporte = new Soporte(this.soporte.sp_titulo, this.soporte.sp_detalle, this.soporte.sp_id, this.soporte.sp_usuario, 4);
    this._soporte.actualizaTicket(this.soporte).subscribe( resp =>{
      this.comentario = new Comentario(0, this.soporte.sp_id, forma.value.spc_detalle, this.soporte.sp_usuario, 0);
      this._master.asignarTecnico(this.comentario).subscribe( resp =>{
        Swal.fire({
          icon: "success",
          title: "Requerimento agregado!",
          showConfirmButton: false,
          timer: 1500
        });
        forma.reset()
        this.router.navigate(['/soportes']);
      })
    })
  }


  

  requerimientoNoSolucionado(){
    this.quejas = true;
    Swal.fire({
      title: 'Por favor describa sus inconvenientes!',
      showClass: {
        popup: 'animated fadeInDown faster'
      },
      hideClass: {
        popup: 'animated fadeOutUp faster'
      }
    })
  
  }

  listadoCometarios(){
    this.tablaCometarios = false
    this.activatedRoute.params.subscribe(params => {
      var id = +params["id"];
      this._soporte.obtenerComentarios(id).subscribe((resp: any) => {
        this.comentarios = resp.data;
      });
    });
  }

  obtenerTecnicoAsignado(){
    this.activatedRoute.params.subscribe(params => {
      var id = +params["id"];
      this._soporte.obtenetTEcnicoAsignado(id).subscribe((resp: any) => {
        this.tecnico = resp.data[0];
      });
    });
  }
}



