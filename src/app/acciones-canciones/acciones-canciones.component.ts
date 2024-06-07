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
export class AccionesCancionesComponent implements OnInit {

  constructor(public PlaylistService: PlaylistService, private router: Router, private http: HttpClient, private cookieService: CookieService) { }

  canciones: any[] = [];
  categorias: any[] = [];
  playlistSeleccionada: number | null = null;
  CancionSeleccionada2: any = {}; // Variable para almacenar la canción seleccionada
  searchText: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;

  ngOnInit(): void {
    this.PlaylistService.obtenerCanciones().subscribe(
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

    this.PlaylistService.obtenerPlaylist().subscribe(
      (data: any) => {
        if (data) {
          this.categorias = data;
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

  editarItem(cancion: any) {
    const id = cancion.id;
    console.log(id);
    this.cookieService.set('cancion', id);
    console.log('ID de la canción seleccionada:', id);
    const cookieValue = this.cookieService.get('cancion');
    console.log('Valor de la cookie:', cookieValue);
    this.router.navigateByUrl("/editar");
  }

  

  GuardarEnPlayList() {
    const formData = {
      idCancion: Number(this.CancionSeleccionada2.id),
      idPlaylist: Number(this.playlistSeleccionada)
    };
    console.log('Datos del formulario:', formData);

    this.PlaylistService.guardarCancionEnPlaylist(formData).subscribe(
      (response: any) => {
        console.log('Canción agregada a la playlist exitosamente:', response);
        this.mostrarAlerta('Se Agregó a la Playlist', 'success');
        this.closeModal();
      },
      (error) => {
        console.error('Error agregando la canción a la playlist:', error);
      }
    );
  }

  eliminarCancion(cancion: any) {
    const id = cancion.id;
    console.log(id);
  
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará la canción seleccionada. ¿Quieres continuar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.PlaylistService.EliminarsCancion(id).subscribe(
          (data: any) => {
            if (data) {
              this.canciones = data;
            } else {
              this.mostrarAlerta('Se eliminó correctamente', 'success');
            }
          },
          (error) => {
            console.log(error);
          }
        );
      }
    });
  }
  
  mostrarAlerta(mensaje: string, icono: any) {
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
  

  CancionSeleccionada(cancion: any) {
    this.CancionSeleccionada2 = cancion;
    this.openModal();
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
