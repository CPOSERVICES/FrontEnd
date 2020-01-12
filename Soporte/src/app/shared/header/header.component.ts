import { Component, OnInit } from '@angular/core';
import { ModalSoporteService, UsuarioService } from 'src/app/services/service.index';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  usuario: any

  constructor(
    public _usuario: UsuarioService,
    public _modalSoporteService: ModalSoporteService
  ) {
    this.usuario = this._usuario.getIdentity();
   }

  ngOnInit() {
  }

  mostrarModal(){
    this._modalSoporteService.mostarModal();
  }

}
