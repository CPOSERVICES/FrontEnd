import { Component, OnInit } from "@angular/core";
import {
  SoporteService,
  UsuarioService,
  TecnicoService,
  MasterService
} from "src/app/services/service.index";
import { ActivatedRoute, Router } from "@angular/router";
import { Soporte } from "src/app/models/soporte.model";
import { Comentario } from "src/app/models/soporteComentarios.model";
import Swal from "sweetalert2";
import { Comentarios } from 'src/app/models/comentarios.model';

@Component({
  selector: "app-ver-soporte",
  templateUrl: "./ver-soporte.component.html",
  styles: []
})
export class VerSoporteComponent implements OnInit {
  soporte: Soporte;
  usuario: any;
  comentario: Comentario;
  comentarios: Comentarios[] = [];
  cuadroComentario: boolean = false;

  titulo: string;
  detalle: string;
  idTecnico: number;
  tablaCometarios: boolean = false; 

  constructor(
    public _soporte: SoporteService,
    public _usuario: UsuarioService,
    public _tecnico: TecnicoService,
    public _master: MasterService,
    public activatedRoute: ActivatedRoute,
    public router: Router
  ) {
    this.usuario = this._usuario.getIdentity();
    this.soporte = new Soporte("", "", 0, this.usuario[0].id, 2);
    this.comentario = new Comentario(0, 0, "", 0, 0);
  }

  ngOnInit() {
    this.cargarTicket();
  }

  cargarTicket() {
    this.activatedRoute.params.subscribe(params => {
      var id = +params["id"];
      this._soporte.cargarTicketSoporte(id).subscribe((resp: any) => {
        this.soporte = resp.soporte[0];
      });
    });
  }

  actuaizaEstadoRevisando() {
    this.soporte = new Soporte(
      this.soporte.sp_titulo,
      this.soporte.sp_detalle,
      this.soporte.sp_id,
      this.soporte.sp_usuario,
      4
    );
    this._soporte.actualizaTicket(this.soporte).subscribe(resp => {
      this.cuadroComentario = true;
    });
  }

  crearComentarioTecnico(forma) {
    this.comentario = new Comentario(
      0,
      this.soporte.sp_id,
      forma.value.spc_detalle,
      this.soporte.sp_usuario,
      this.usuario[0].id
    );
    this._tecnico.crearComentario(this.comentario).subscribe(resp => {
      Swal.fire({
        icon: "success",
        title: "Solución agregada exitosamente!",
        showConfirmButton: false,
        timer: 1500
      });
      forma.reset();
      this.router.navigate(["/tecnico"]);
    });
  }


  confirmarSolucionTecnico(forma){
    this.soporte = new Soporte(this.soporte.sp_titulo, this.soporte.sp_detalle, this.soporte.sp_id, this.soporte.sp_usuario, 5);
    this._soporte.actualizaTicket(this.soporte).subscribe( resp =>{
      this.comentario = new Comentario(0, this.soporte.sp_id, forma.value.spc_detalle,  this.usuario[0].id,this.soporte.sp_usuario);
      this._master.asignarTecnico(this.comentario).subscribe( resp =>{
        Swal.fire({
          icon: "success",
          title: "Técnico a solucionado inconveniente!",
          text: 'Por favor espere confirmacion del usuario',
          showConfirmButton: false,
          timer: 1500
        });
        forma.reset()
        this.router.navigate(['/tecnico']);
      })
    });
  }

  listadoCometarios(){
    this.tablaCometarios = false
    this.activatedRoute.params.subscribe(params => {
      var id = +params["id"];
      this._soporte.obtenerComentarios(id).subscribe((resp: any) => {
        this.comentarios = resp.data;
        if( this.comentarios.length == 0){
          this.tablaCometarios = false;
        } else {
          this.tablaCometarios = true;
        }
      });
    });
  }

}
