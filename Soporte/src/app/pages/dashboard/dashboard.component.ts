import { Component, OnInit } from '@angular/core';
import { UsuarioService, ModalSoporteService } from 'src/app/services/service.index';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  usuario: any

  constructor(
    public _usuario: UsuarioService,
    public _modalSoporteServices: ModalSoporteService
  ) {
    this.usuario = this._usuario.getIdentity();
   }

  ngOnInit() {
  }

  mostarModal(){
    this._modalSoporteServices.mostarModal();
  }

}
