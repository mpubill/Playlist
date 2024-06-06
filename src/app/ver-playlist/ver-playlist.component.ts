import { Component, OnInit } from '@angular/core';
import { PlaylistService } from "../playlistService/playlist.service";
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: 'app-ver-playlist',
  templateUrl: './ver-playlist.component.html',
  styleUrls: ['./ver-playlist.component.css']
})
export class VerPlaylistComponent implements OnInit{

  constructor(public PlaylistService: PlaylistService, private router: Router, private http: HttpClient, private cookieService: CookieService) { }

  categorias: any[] = [];
  playlistSeleccionado: any = {};
  selectedFile: File | null = null;



  ngOnInit(): void {

    
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


  submitForm(categoria: any) {
    // Aquí puedes acceder al id de la categoría seleccionada
    const categoryId = categoria.id;

    console.log("aquii", categoryId)

    //Crear una cookie con el categoryId como valor
    this.cookieService.set('idPlayList', categoryId);
  
    // Realiza cualquier otra acción que necesites con el categoryId
    console.log('ID de la categoría seleccionada:', categoryId);
  
    // También puedes verificar que la cookie se haya creado correctamente
    const cookieValue = this.cookieService.get('idPlayList');
    console.log('Valor de la cookie:', cookieValue);
  
    this.router.navigateByUrl("/ver-canciones");
    
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

  eliminarPlaylist(playlist: any) {
    const id = playlist.id;
    console.log(id);
  
    // Pedir confirmación al usuario antes de eliminar la playlist
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Estás a punto de eliminar esta playlist. Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Si el usuario confirma la eliminación, realizar la solicitud HTTP para eliminar la playlist
        this.PlaylistService.EliminarsPlaylist(id).subscribe(
          (data: any) => {
            if (data) {
              this.categorias = data;
            } else {
              this.mostrarAlerta();
            }
          },
          (error) => {
            console.log(error);
          }
        );
      }
    });
  }
  
  
  

  editarItem(ejercicios: any) {
    const id = ejercicios.id;
    console.log(id)
    // Crear una cookie con el categoryId como valor
    this.cookieService.set('playlist', id);

    // Realiza cualquier otra acción que necesites con el categoryId
    console.log('ID de la categoría seleccionada:', id);

    // También puedes verificar que la cookie se haya creado correctamente
    const cookieValue = this.cookieService.get('playlist');
    console.log('Valor de la cookie:', cookieValue);

    this.router.navigateByUrl("/editar-playlist");
  }
  

}
