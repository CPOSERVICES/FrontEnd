import { Injectable } from "@angular/core";
import Swal from 'sweetalert2';

@Injectable({
  providedIn: "root"
})
export class ModalSoporteService {
  public id: number;
  public oculto: string = "oculto";

  constructor() {}

  ocultarModal() {
    this.oculto = "oculto";
    this.id = null;
  }

  mostarModal() {
    
    this.oculto = "";
    //this.id = id;
   // Swal.fire('Para visualizar la información presione CARGAR')
  }
}
