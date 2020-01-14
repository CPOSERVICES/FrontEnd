import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SoporteService } from 'src/app/services/service.index';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: []
})
export class UsuarioComponent implements OnInit {

  constructor( 
    public activatedRoute: ActivatedRoute,
    public _soporte: SoporteService
  ) { }

  ngOnInit() {
    this.cargarTicket();
  }

  cargarTicket() {
    this.activatedRoute.params.subscribe(params => {
      var id = +params["id"];
      this._soporte.cargarTicketSoporte(id).subscribe((resp: any) => {
      });
    });
  }

}
