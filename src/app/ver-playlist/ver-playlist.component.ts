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

  eliminarPlaylist(artista: any){
    const id = artista.id;
    console.log(id)

    this.PlaylistService.EliminarsPlaylist(id).subscribe(
      (data: any) => {
        // Assuming data.token exists in the response
        if (data) {
          this.categorias = data;
        } else{
          this.mostrarAlerta();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
