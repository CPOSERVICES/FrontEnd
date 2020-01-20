import { Component, OnInit, NgZone } from "@angular/core";
import {
  SoporteService,
  ModalSoporteService,
  UsuarioService,
  CorreoService
} from "src/app/services/service.index";
import { ActivatedRoute, Router } from "@angular/router";
import { Soporte } from "src/app/models/soporte.model";
import Swal from "sweetalert2";
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: "app-modal-soporte",
  templateUrl: "./modal-soporte.component.html",
  styles: []
})
export class ModalSoporteComponent implements OnInit {
  soporte: Soporte;
  usuario: any;
  soportes: Soporte[] = [];
  cargandoTicket: boolean = false;
  idUsuario: number;

  constructor(
    public _usuario: UsuarioService,
    public _soporte: SoporteService,
    public _modalSoporteService: ModalSoporteService,
    public _correo: CorreoService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
  ) {
    this.usuario = this._usuario.getIdentity();
    this.soporte = new Soporte("", "", 0, this.usuario[0].id, 2);
    this.idUsuario = this.usuario[0].id;
  }

  ngOnInit() {
    //this.enviarMail();
  }

  cerrarModal() {
    this._modalSoporteService.ocultarModal();
    this.soporte = new Soporte("", "", 0, 0, 0);
    
  }

  cargarTicketsUsuario() {
    this._soporte
      .cargarTicketSoporteUsuario(this.idUsuario)
      .subscribe((resp: any) => {
        this.soportes = resp.data;
        if (this.soportes.length == 0) {
          this.cargandoTicket = false;
        } else {
          this.cargandoTicket = true;
        }
      });
  }

  registarTicket(forma) {
    this._soporte.crearTicket(this.soporte).subscribe(resp => {
      if (resp.ok === true) {
        Swal.fire({
          icon: "success",
          title: "Ticket creado exitosamente!",
          showConfirmButton: false,
          timer: 1500
        });
        this.enviarMail();
        forma.reset();
        this.cerrarModal();
        this.router
          .navigateByUrl("/SoportesComponent", { skipLocationChange: true })
          .then(() => {

            this.router.navigate(["/soportes"]);
          });
      } else {
        Swal.fire({
          icon: "warning",
          title: "Error al crear Ticket",
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  }

  enviarMail(){
    this.usuario = new Usuario (this.usuario[0].usuario,'',this.usuario[0].correo,'','',0,0)
     this._correo.enviarMailTecnico(this.usuario).subscribe(resp =>{
     })
  }
}
