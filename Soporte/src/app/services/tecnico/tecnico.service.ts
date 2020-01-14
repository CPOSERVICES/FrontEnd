import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';
import { HttpClient } from '@angular/common/http';
import { Comentario } from 'src/app/models/soporteComentarios.model';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class TecnicoService {

  public usuario: any


  constructor(
    public http: HttpClient
  ) {}

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
