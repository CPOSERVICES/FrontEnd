import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { Usuario } from 'src/app/models/usuario.model';
import { Router } from '@angular/router';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  id: any;
  token: string;
  identity: string;

  constructor( 
    private http: HttpClient,
    private router: Router
    ) { 
      this.getIdentity();
      this.cargarStorage();
    }


  login ( usuario: Usuario) {
    let url = URL_SERVICIOS + '/login';
    ///console.log(usuario);
    return this.http.post(url, usuario) 
                  .map( (resp: any) => {
                    this.guardarStorage( resp.id, resp.usuario );
                     return true;
                  }).catch( err =>{
                    Swal.fire({
                      icon: 'error',
                      title: 'Error en el Login',
                      text: err.error.mensaje,
                    
                    })
                      return Observable.throw(err);
                  })
  }


  guardarStorage( id: string, usuario: Usuario) {
    localStorage.setItem('id', id);
    //localStorage.setItem('token', resp.token);
    localStorage.setItem('usuario',JSON.stringify(usuario));

    this.usuario = usuario;

    //this.token = token;
  }

  logout(){
    this.usuario = null;
    this.id = null
    //this.token = ''

    //localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('id');

    this.router.navigate(['/login']);
  }

  estaLogueado(){
    return ( this.getIdentity() != null) ? true : false
  }

  cargarStorage(){
    if(localStorage.getItem('id')){
      this.id = JSON.parse(localStorage.getItem('id'));
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.id = '';
      this.usuario = null;
    }
  }

  getIdentity() {
    const identity = JSON.parse(localStorage.getItem('usuario'));
    if (identity && identity != 'undefined' ){
        this.identity = identity;
    } else {
        this.identity = null;
    }
    return this.identity;
  }







}
