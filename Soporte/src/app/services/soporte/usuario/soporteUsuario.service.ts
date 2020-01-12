import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Soporte } from "src/app/models/soporte.model";
import { URL_SERVICIOS } from "src/app/config/config";
import "rxjs/add/operator/map";
import Swal from "sweetalert2";
import { Comentario } from "src/app/models/soporteComentarios.model";

@Injectable({
  providedIn: "root"
})
export class SoporteService {
  constructor(public http: HttpClient) {}

  /************************************* 
  LISTAR REQUERIMIENTOS
**************************************/
  listarSoportes() {
    let url = URL_SERVICIOS + "/soportes";
    return this.http.get(url);
  }

  /************************************* 
  LISTA REQUERIMIENTO POR ID
**************************************/
  cargarTicketSoporte(id: number) {
    let url = URL_SERVICIOS + "/soporte/" + id;
    return this.http.get(url);
  }

  /************************************* 
  CREA NUEVO REQUERIMIENTO
**************************************/
  crearTicket(soporte: Soporte) {
    let url = URL_SERVICIOS + "/crear";
    return this.http.post(url, soporte).map((resp: any) => {
      return resp;
    });
  }

  cargarTicketSoporteUsuario(id: number) {
    let url = URL_SERVICIOS + "/usuario/" + id;
    return this.http.get(url);
  }

  /************************************* 
  ACTUALIZA REQUERIMIENTO POR ID
**************************************/
  actualizaTicket(soporte: Soporte) {
    let url = URL_SERVICIOS + "/actualiza/" + soporte.sp_id;
    return this.http.put(url, soporte).map((resp: any) => {
      return resp;
    });
  }

  /************************************* 
  ELIMINA REQUERIMIENTO POR ID
**************************************/
  borrarTicket(id: number) {
    let url = URL_SERVICIOS + "/soporte/" + id;
    //url += '?token=' + this._usuario.token;
    return this.http.delete(url).map(resp => {
      Swal.fire({
        icon: "success",
        title: "Ticket Eliminado!",
        text: "Ticket a sido eliminado exitosamente!",
        showConfirmButton: false,
        timer: 1500
      });
      return true;
    });
  }

  obtenerComentarios(id: number) {
    let url = URL_SERVICIOS + "/comentarios/" + id;
    return this.http.get(url);
  }

  obtenetTEcnicoAsignado( id: number){
    let url = URL_SERVICIOS + "/tecnicoA/" + id;
    return this.http.get(url);
  }

  // asignarTecnico(comentario: Comentario) {
  //   let url = URL_SERVICIOS + "/soporteComentario";
  //   return this.http.post(url, comentario).map((resp: any) => {
  //     return resp;
  //   });
  // }

  // crearComentario( comentario: Comentario){
  //   let url = URL_SERVICIOS + "/soporteComentario";
  //   return this.http.post(url, comentario);
  // }
}
