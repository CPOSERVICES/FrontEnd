import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { Comentario } from 'src/app/models/soporteComentarios.model';
import { Usuario } from 'src/app/models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class CorreoService {

  constructor(
    public http: HttpClient
  ) { }

/************************************** 

**************************************/
obtenerMail(id: number) {
  let url = URL_SERVICIOS + "/obtenerMails/" + id;
  return this.http.get(url).map((resp: any) => {
    return resp;
  });
}

/************************************** 

**************************************/
enviarMailUsuario(usuario: Usuario) {
  let url = URL_SERVICIOS + "/enviarU";
  return this.http.post(url, usuario).map((resp: any) => {
    return resp;
  });
}

enviarMailTecnico(usuario: Usuario) {
  let url = URL_SERVICIOS + "/enviarT";
  return this.http.post(url, usuario).map((resp: any) => {
    return resp;
  });
}


}
