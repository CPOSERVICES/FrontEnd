import { Component, OnInit } from '@angular/core';
import { Soporte } from 'src/app/models/soporte.model';
import { Comentarios } from 'src/app/models/comentarios.model';
import { SoporteService } from 'src/app/services/service.index';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styles: []
})
export class ComentariosComponent implements OnInit {
  soporte: Soporte;
  comentarios: Comentarios[] = [];

  constructor(
    public _soporte: SoporteService,
    public activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.listadoCometarios();
  }

  listadoCometarios(){
    this.activatedRoute.params.subscribe(params => {
      var id = +params["id"];
      this._soporte.obtenerComentarios(id).subscribe((resp: any) => {
        this.comentarios = resp.data;
      });
    });
  }

}
