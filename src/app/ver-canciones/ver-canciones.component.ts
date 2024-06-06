import { Component, OnInit } from '@angular/core';
import { PlaylistService } from "../playlistService/playlist.service";
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: 'app-ver-canciones',
  templateUrl: './ver-canciones.component.html',
  styleUrls: ['./ver-canciones.component.css']
})
export class VerCancionesComponent implements OnInit{


  constructor(public PlaylistService: PlaylistService, private router: Router, private http: HttpClient, private cookieService: CookieService) { }

  canciones: any[] = [];

  ngOnInit(): void {

    const valor = this.cookieService.get('idPlayList');
    console.log('Valor de miCookie:', valor);

     //traer las categorias para el filtro
     this.PlaylistService.obtenerListCanciones(valor).subscribe(
      (data: any) => {
        // Assuming data.token exists in the response
        if (data) {
          this.canciones = data;
        } else {
          console.log("si llega aqui inserto datos");
        }
      },
      (error) => {
        console.log(error);
      }
    );
    
  }

}
