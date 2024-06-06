import { Component, OnInit } from '@angular/core';
import { PlaylistService } from "../playlistService/playlist.service";
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: 'app-acciones-canciones',
  templateUrl: './acciones-canciones.component.html',
  styleUrls: ['./acciones-canciones.component.css']
})
export class AccionesCancionesComponent implements OnInit{

  constructor(public PlaylistService: PlaylistService, private router: Router, private http: HttpClient, private cookieService: CookieService) { }
 
  canciones: any[] = [];

  nombre: string = "";
  artista: string = ""; 
  imagen: string = "";
  cancion: string = "";
  idplaylist: number = 0; 

  ngOnInit(): void {

    this.PlaylistService.obtenerCanciones().subscribe(
      (data: any) => {
        // Assuming data.token exists in the response
        if (data) {
          this.canciones = data;
        } 
      },
      (error) => {
        console.log(error);
      }
    );
    
  }


  editarItem(ejercicios: any) {
    const id = ejercicios.id;
    console.log(id)
    // Crear una cookie con el categoryId como valor
    this.cookieService.set('cancion', id);

    // Realiza cualquier otra acción que necesites con el categoryId
    console.log('ID de la categoría seleccionada:', id);

    // También puedes verificar que la cookie se haya creado correctamente
    const cookieValue = this.cookieService.get('cancion');
    console.log('Valor de la cookie:', cookieValue);

    this.router.navigateByUrl("/editar");
  }


  
  mostrarAlerta() {
    Swal.fire({
      title: 'Se eliminó correctamente',
      icon: 'success',
      timer: 1000,
      showConfirmButton: false,
      didClose: () => {
        window.location.reload();
      }
    });
}



  // eliminarItem(ejercicios: any){

  //   const id = ejercicios.id;
  //   console.log(id)

  //   this.PlaylistService.Eliminars(id).subscribe(
  //     (data: any) => {
  //       // Assuming data.token exists in the response
  //       if (data) {
  //         this.canciones = data;
  //       } else{
  //         this.mostrarAlerta();
  //       }
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  //}


}
