import { Component, OnInit } from '@angular/core';
import { UsuarioService, ModalSoporteService } from 'src/app/services/service.index';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {
  usuario: any

  constructor(
    public _usuario: UsuarioService,
    public _modalSoporte: ModalSoporteService
  ) { 
    this.usuario = this._usuario.getIdentity();
  }

  ngOnInit() {

  }

  mostarModal(){
    this._modalSoporte.mostarModal();
  }

  
  

}
