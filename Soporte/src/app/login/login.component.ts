import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();
declare function init_pluginsSide();


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  user: string = "";
  pass: string = "";

  constructor( public router: Router,
               public _usuarioSerice: UsuarioService ) { }

  ngOnInit() {
    init_plugins();
    init_pluginsSide();
  }

  ingresar( forma: NgForm) {
    if ( forma.invalid){
      return;
    }
    let usuario =  new Usuario(
      forma.value.user, 
      forma.value.pass,
    );
       this._usuarioSerice.login( usuario )
               .subscribe( (resp: any) =>{
                this.router.navigate(['/dashboard'])
               });
                

  }

  

}
