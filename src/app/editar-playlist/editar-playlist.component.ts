import { Component, OnInit } from '@angular/core';
import { PlaylistService } from "../playlistService/playlist.service";
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: 'app-editar-playlist',
  templateUrl: './editar-playlist.component.html',
  styleUrls: ['./editar-playlist.component.css']
})
export class EditarPlaylistComponent implements OnInit {

  constructor(
    public playlistService: PlaylistService, 
    private router: Router, 
    private http: HttpClient, 
    private cookieService: CookieService
  ) { }

  playlistSeleccionado: any = {};

  id: number = 0;
  nombre: string = "";
  imagen: string = "";
  selectedFile: File | null = null;
  imagenVistaPrevia: string | ArrayBuffer | null = "";

  ngOnInit(): void {
    const valor = this.cookieService.get('playlist');
    console.log('Valor de miCookie:', valor);

    this.playlistService.obtenerPlaylistPorId(valor).subscribe(
      (data: any) => {
        if (data) {
          this.playlistSeleccionado = data;
          this.id = data.id;
          this.nombre = data.nombre;
          this.imagen = data.imagen;
          this.imagenVistaPrevia = data.imagen; // Mostrar imagen existente
        } else {
          console.log("No se encontraron datos de la playlist.");
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagenVistaPrevia = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  mostrarAlerta() {
    Swal.fire({
      title: 'Playlist actualizada correctamente',
      icon: 'success',
      timer: 2500,
      showConfirmButton: false
    });
  }

  guardarProducto() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('imagen', this.selectedFile);
      this.http.post<any>('http://localhost:3000/subir-imagen', formData).subscribe(
        (respuesta) => {
          this.imagen = respuesta.imageUrl;
          this.actualizarPlaylist();
        },
        (error) => {
          console.error('Error al subir la imagen:', error);
        }
      );
    } else {
      this.actualizarPlaylist();
    }
  }

  actualizarPlaylist() {
    const playlistActualizada = {
      nombre: this.nombre,
      imagen: this.imagen,
    };

    this.playlistService.actualizarPlaylist(this.id, playlistActualizada).subscribe(
      (data: any) => {
        this.mostrarAlerta();
        this.router.navigateByUrl("/ver-playlist");
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
