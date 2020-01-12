import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';
import { HttpClient } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Comentario } from 'src/app/models/soporteComentarios.model';

@Injectable({
  providedIn: 'root'
})
export class TecnicoService {

  constructor(
    public http: HttpClient
  ) { }

  /************************************* 
  LISTA REQUERIMIENTO POR ID
**************************************/
cargarTicketSoporteTecnico(id: number) {
  let url = URL_SERVICIOS + "/tecnico/" + id;
  return this.http.get(url);
}

crearComentario( comentario: Comentario){
  let url = URL_SERVICIOS + "/soporteComentario";
  return this.http.post(url, comentario);
}



}
