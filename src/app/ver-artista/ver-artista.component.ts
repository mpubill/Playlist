import { Component, OnInit } from '@angular/core';
import { PlaylistService } from "../playlistService/playlist.service";
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: 'app-ver-artista',
  templateUrl: './ver-artista.component.html',
  styleUrls: ['./ver-artista.component.css']
})
export class VerArtistaComponent implements OnInit {
  artistas: any[] = [];
  artistaSeleccionado: any = {}; // Variable para almacenar el artista seleccionado
  nombreCancion: string = '';
  imagen: string = "";
  cancion: string = "";
  searchText: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;

  constructor(public PlaylistService: PlaylistService, private router: Router, private http: HttpClient, private cookieService: CookieService) { }

  ngOnInit(): void {
    // Traer las categorias para el filtro
    this.PlaylistService.obtenerlistaArtista().subscribe(
      (data: any) => {
        if (data) {
          this.artistas = data;
          this.updateTotalPages();
        } else {
          console.log("si llega aqui inserto datos");
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  setArtistaSeleccionado(artista: any) {
    this.artistaSeleccionado = artista;
    this.openModal();
  }

  updateTotalPages(): void {
    this.totalPages = Math.ceil(this.artistas.length / this.itemsPerPage);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  editarItem(artista: any) {
    const id = artista.id;
    console.log(id);
    this.cookieService.set('artista', id);
    this.router.navigateByUrl("/editar-artista");
  }

  eliminarArtista(artista: any) {
    const id = artista.id;
    console.log(id);

    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Si eliminas este artista, también se eliminarán todas las canciones asociadas. ¿Quieres continuar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.PlaylistService.EliminarsArtista(id).subscribe(
          (data: any) => {
            if (data) {
              this.artistas = data;
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

  selectedFile: File | null = null;
  selectedFile2: File | null = null;

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onFileSelected2(event: any) {
    this.selectedFile2 = event.target.files[0];
  }

  agregarCancion() {
    if (!this.selectedFile) {
      alert('Selecciona una imagen primero.');
      return;
    }

    const formData = new FormData();
    formData.append('imagen', this.selectedFile);
    this.http.post<any>('http://localhost:3000/subir-imagen', formData).subscribe(
      (respuesta) => {
        this.imagen = respuesta.imageUrl;

        if (!this.selectedFile2) {
          alert('Selecciona una imagen primero.');
          return;
        }

        const formData2 = new FormData();
        formData2.append('imagen', this.selectedFile2);
        this.http.post<any>('http://localhost:3000/subir-imagen', formData2).subscribe(
          (respuesta) => {
            this.cancion = respuesta.imageUrl;

            const user = {
              nombre: this.nombreCancion,
              imagen: this.imagen,
              cancion: this.cancion,
              artistaId: this.artistaSeleccionado.id
            };

            this.PlaylistService.agregarCanciones(user).subscribe(
              (data: any) => {
                if (data.token) {
                  this.router.navigateByUrl("/");
                }
                this.artistaSeleccionado = {};
                this.nombreCancion = '';
                this.imagen = "";
                this.cancion = "";
                Swal.fire({
                  title: 'Se agrego correctamente',
                  icon: 'success',
                  timer: 1000,
                  showConfirmButton: false,
                  didClose: () => {
                    window.location.reload();
                  }
                });
                this.router.navigateByUrl("/ver-artista");
              },
              (error) => {
                console.error('Error al agregar canción:', error);
              }
            );
          },
          (error) => {
            console.error('Error al subir la canción:', error);
          }
        );
      },
      (error) => {
        console.error('Error al subir la imagen:', error);
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

  get filteredArtistas() {
    return this.artistas.filter(artista =>
      artista.nombre.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  get paginatedArtistas() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredArtistas.slice(startIndex, endIndex);
  }
}
