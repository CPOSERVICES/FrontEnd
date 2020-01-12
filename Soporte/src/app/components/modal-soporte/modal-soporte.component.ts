import { Component, OnInit, NgZone } from "@angular/core";
import {
  SoporteService,
  ModalSoporteService,
  UsuarioService
} from "src/app/services/service.index";
import { ActivatedRoute, Router } from "@angular/router";
import { Soporte } from "src/app/models/soporte.model";
import Swal from 'sweetalert2';

@Component({
  selector: "app-modal-soporte",
  templateUrl: "./modal-soporte.component.html",
  styles: []
})
export class ModalSoporteComponent implements OnInit {
  soporte: Soporte;
  usuario: any;

  constructor(
    public _usuario: UsuarioService,
    public _soporte: SoporteService,
    public _modalSoporteService: ModalSoporteService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    private zone: NgZone

  ) {
    this.usuario = this._usuario.getIdentity();
    this.soporte = new Soporte("", "", 0, this.usuario[0].id, 2);
  }

  ngOnInit() {}

  cerrarModal() {
    this._modalSoporteService.ocultarModal();
    this.soporte = new Soporte("", "", 0, 0, 0);
  }

  registarTicket(forma) {
    this._soporte.crearTicket(this.soporte).subscribe(resp => {
      if( resp.ok === true){
        Swal.fire({
          icon: "success",
          title: "Ticket creado exitosamente!",
          showConfirmButton: false,
          timer: 1500
          
        });
        forma.reset()
        this.cerrarModal();
        this.router.navigate(['/soportes']);
        this.reloadPage();
      }else{
        Swal.fire({
          icon: "warning",
          title: "Error al crear Ticket",
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  }

  reloadPage() { // click handler or similar
    this.zone.runOutsideAngular(() => {
        location.reload();
    });
}
}
