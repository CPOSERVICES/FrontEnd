import { Component, OnInit } from "@angular/core";
import {
  SoporteService,
  ModalSoporteService,
  UsuarioService
} from "src/app/services/service.index";
import { Soporte } from "src/app/models/soporte.model";
import Swal from "sweetalert2";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-soportes",
  templateUrl: "./soportes.component.html",
  styles: []
})
export class SoportesComponent implements OnInit {
  soportes: Soporte[] = [];
  //soporte: Soporte = new Soporte('','',0,0,2);
  usuario: any
  idUsuario: number
  cargandoTicket: boolean = false;

  constructor(
    public _usuario: UsuarioService,
    public _soporte: SoporteService,
    public _modalSoporteService: ModalSoporteService,
    public activatedRoute: ActivatedRoute
  ) {
    this.usuario = this._usuario.getIdentity();
    this.idUsuario =  this.usuario[0].id;
    this.cargarTicketsUsuario();
  }

  ngOnInit() {
    this.cargarTicketsUsuario();
  }
  mostarModal(){
    this._modalSoporteService.mostarModal();
  }

  cargarTicketsUsuario() {
       this._soporte.cargarTicketSoporteUsuario(this.idUsuario).subscribe((resp: any) => {
        this.soportes = resp.data
        if( this.soportes.length == 0){
          this.cargandoTicket = false;
        } else {
          this.cargandoTicket = true;
        }
       
     });
   }

  borrarTicket(soporte: Soporte) {
    Swal.fire({
      title: "Esta seguro?",
      text: "Esta a punto de borrar! " + soporte.sp_titulo,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar"
    }).then(borrar => {
      if (borrar.value) {
        this._soporte.borrarTicket(soporte.sp_id).subscribe(borrado => {
          this.cargarTicketsUsuario();
        });
      }
    });
  }
}
