import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styles: []
})
export class BreadcrumbComponent implements OnInit {

  titulo: string;

  constructor( private router: Router,
               private title: Title ) { 

      this.router.events.pipe(
          filter( evento => evento instanceof ActivationEnd),
          filter( (evento: ActivationEnd ) => evento.snapshot.firstChild === null ),
          map( (evento: ActivationEnd ) => evento.snapshot.data ) 
      )
      .subscribe( data => {
        this.titulo = data.titulo;
        this.title.setTitle( this.titulo );
      });

  }

  ngOnInit() {
  }

}
