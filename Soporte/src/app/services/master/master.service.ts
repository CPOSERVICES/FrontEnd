import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { URL_SERVICIOS } from "src/app/config/config";
import { Comentario } from 'src/app/models/soporteComentarios.model';

@Injectable({
  providedIn: "root"
})
export class MasterService {
  constructor(public http: HttpClient) {}

  asignarTecnico(comentario: Comentario) {
    let url = URL_SERVICIOS + "/soporteComentario";
    return this.http.post(url, comentario).map((resp: any) => {
      return resp;
    });
  }

  cargarTicketsRevisando() {
    let url = URL_SERVICIOS + "/soportesR";
    return this.http.get(url);
  }

  crearComentario( comentario: Comentario){
    let url = URL_SERVICIOS + "/soporteComentario";
    return this.http.post(url, comentario);
  }
}
