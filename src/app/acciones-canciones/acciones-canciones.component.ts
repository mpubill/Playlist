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
  playlist: string = "";

  categorias: any[] = [];
  nombre2: string = "";
  id2: number = 0;

  playlistSeleccionada: number | null = null;


  CancionSeleccionada2: any = {}; // Variable para almacenar el artista seleccionado
  
  CancionSeleccionada(pr: any) {
    this.CancionSeleccionada2 = pr;
    this.openModal();
  }


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

    this.PlaylistService.obtenerPlaylist().subscribe(
      (data: any) => {
        // Assuming data.token exists in the response
        if (data) {
          this.categorias = data;
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









GuardarEnPlayList() {
  const formData = {
    idCancion: Number(this.CancionSeleccionada2.id), // Convertir a número
    idPlaylist: Number(this.playlistSeleccionada) // Convertir a número
  };


    // Imprimir los valores de formData en la consola
    console.log('Datos del formulario:', formData);


  this.PlaylistService.guardarCancionEnPlaylist(formData).subscribe(
    (response: any) => {
      console.log('Canción agregada a la playlist exitosamente:', response);
      this.mostrarAlerta2();
      this.closeModal();
    },
    (error) => {
      console.error('Error agregando la canción a la playlist:', error);
    }
  );
}


mostrarAlerta2() {
  Swal.fire({
    title: 'Se Agrego a la Playlist',
    icon: 'success',
    timer: 1000,
    showConfirmButton: false,
    didClose: () => {
      window.location.reload();
    }
  });
}




  eliminarCancion(ejercicios: any){

    const id = ejercicios.id;
    console.log(id)

    this.PlaylistService.EliminarsCancion(id).subscribe(
      (data: any) => {
        // Assuming data.token exists in the response
        if (data) {
          this.canciones = data;
        } else{
          this.mostrarAlerta();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }






  openModal() {
    const modalElement = document.getElementById('modalAgregarCancion');
    if (modalElement) {
      modalElement.style.display = 'block';
      modalElement.classList.add('show');
      modalElement.setAttribute('aria-modal', 'true');
      modalElement.setAttribute('aria-hidden', 'false');
    }
  }
  
  closeModal() {
    const modalElement = document.getElementById('modalAgregarCancion');
    if (modalElement) {
      modalElement.style.display = 'none';
      modalElement.classList.remove('show');
      modalElement.setAttribute('aria-modal', 'false');
      modalElement.setAttribute('aria-hidden', 'true');
    }
  }

}
