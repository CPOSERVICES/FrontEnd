import { Component, OnInit } from "@angular/core";
import { Soporte } from "src/app/models/soporte.model";
import { ActivatedRoute, Router } from "@angular/router";
import { SoporteService } from "src/app/services/service.index";
import Swal from 'sweetalert2';

@Component({
  selector: "app-soporte-edit",
  templateUrl: "./soporte-edit.component.html",
  styles: []
})
export class SoporteEditComponent implements OnInit {
  public soporte: Soporte;
  form: any;

  public sp_titulo: string;
  public sp_detalle: string;
  public sp_id: number;

  constructor(
    public _soporte: SoporteService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.soporte = new Soporte("", "", 0, 0, 0, "");
  }

  ngOnInit() {
    this.cargarTicket();
  }

  cargarTicket() {
    this.activatedRoute.params.subscribe(params => {
      var id = +params["id"];
      this._soporte.cargarTicketSoporte(id).subscribe((resp: any) => {
        this.sp_id = resp.soporte[0].sp_id;
        this.sp_titulo = resp.soporte[0].sp_titulo;
        this.sp_detalle = resp.soporte[0].sp_detalle;
        this.soporte = new Soporte(this.sp_titulo, this.sp_detalle, this.sp_id);
      });
    });
  }

  actualizarTicket(forma) {
    this.form = forma.value;
    this._soporte.actualizaTicket(this.form).subscribe(resp => {
      Swal.fire({
        icon: 'success',
        title: 'Ticket Actualizado',
        showConfirmButton: false,
        timer: 1500
      });
      this.router.navigate(['/soportes']);
    });
  }
}
