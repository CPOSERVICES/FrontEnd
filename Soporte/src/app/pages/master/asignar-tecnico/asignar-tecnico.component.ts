import { Component, OnInit } from '@angular/core';
import { Soporte } from 'src/app/models/soporte.model';
import { UsuarioService, SoporteService, MasterService } from 'src/app/services/service.index';
import { Comentario } from 'src/app/models/soporteComentarios.model';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-asignar-tecnico',
  templateUrl: './asignar-tecnico.component.html',
  styles: []
})
export class AsignarTecnicoComponent implements OnInit {

  soporte: Soporte;
  usuario: any;
  comentario: Comentario;
  idTecnico: number;
  
  constructor(
    public _usuario: UsuarioService,
    public _soporte: SoporteService,
    public _master: MasterService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
  ) { 
    this.usuario = this._usuario.getIdentity();
    this.soporte = new Soporte("", "", 0, this.usuario[0].id, this.usuario[0].estado);
    this.comentario = new Comentario(0,0,'',0,0);    
  }

  ngOnInit() {
    this.cargarTicket();
  }

  cargarTicket() {
    this.activatedRoute.params.subscribe(params => {
      var id = +params["id"];
      this._soporte.cargarTicketSoporte(id).subscribe((resp: any) => {
        this.soporte = resp.soporte[0];
      });
    });
  }

  asignarTecnico(forma){
      this.idTecnico = parseInt(forma.value.spc_clie_tec);
      this.soporte = new Soporte(this.soporte.sp_titulo, this.soporte.sp_detalle, this.soporte.sp_id, this.soporte.sp_usuario, 3);
      this._soporte.actualizaTicket(this.soporte).subscribe( resp =>{
        this.comentario = new Comentario(0, this.soporte.sp_id, forma.value.spc_detalle, this.soporte.sp_usuario, this.idTecnico);
        this._master.asignarTecnico(this.comentario).subscribe( resp =>{
          Swal.fire({
            icon: "success",
            title: "Técnico asignado al exitosamente!",
            showConfirmButton: false,
            timer: 1500
          });
          forma.reset()
          this.router.navigate(['/listar']);
        })
      })

    }

}
