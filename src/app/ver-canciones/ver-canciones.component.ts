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
export class VerCancionesComponent implements OnInit {

  constructor(public PlaylistService: PlaylistService, private router: Router, private http: HttpClient, private cookieService: CookieService) { }

  canciones: any[] = [];
  searchText: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;

  ngOnInit(): void {
    this.obtenerCanciones();
  }

  obtenerCanciones(): void {
    const valor = this.cookieService.get('idPlayList');
    console.log('Valor de miCookie:', valor);

    this.PlaylistService.obtenerListCanciones(valor).subscribe(
      (data: any) => {
        if (data) {
          this.canciones = data;
          this.updateTotalPages();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateTotalPages(): void {
    this.totalPages = Math.ceil(this.canciones.length / this.itemsPerPage);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  get filteredCanciones() {
    return this.canciones.filter(cancion =>
      cancion.nombre.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  get paginatedCanciones() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredCanciones.slice(startIndex, endIndex);
  }

  eliminarCancionPlaylist(cancion: any): void {
    const id = cancion.id;
    console.log(id);

    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará la canción seleccionada de la playlist. ¿Quieres continuar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.PlaylistService.EliminarsCancionPlaylist(id).subscribe(
          (data: any) => {
            if (data) {
              this.obtenerCanciones(); // Llamar al método para volver a cargar las canciones
            } else {
              this.mostrarAlerta('¡Se eliminó correctamente!', 'success');
            }
          },
          (error) => {
            console.log(error);
          }
        );
      }
    });
  }

  mostrarAlerta(mensaje: string, icono: any): void {
    Swal.fire({
      title: mensaje,
      icon: icono,
      timer: 1000,
      showConfirmButton: false,
      didClose: () => {
        window.location.reload();
      }
    });
  }

}
