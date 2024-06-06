import { Component } from '@angular/core';
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
export class VerArtistaComponent {


  constructor(public PlaylistService: PlaylistService, private router: Router, private http: HttpClient, private cookieService: CookieService) { }

  artistas: any[] = [];
  artistaSeleccionado: any = {}; // Variable para almacenar el artista seleccionado
  nombreCancion: string = '';
  imagen: string = "";
  cancion: string = "";

  setArtistaSeleccionado(artista: any) {
    this.artistaSeleccionado = artista;
    this.openModal();
  }

  ngOnInit(): void {


     //traer las categorias para el filtro
     this.PlaylistService.obtenerlistaArtista().subscribe(
      (data: any) => {
        // Assuming data.token exists in the response
        if (data) {
          this.artistas = data;
        } else {
          console.log("si llega aqui inserto datos");
        }
      },
      (error) => {
        console.log(error);
      }
    );
    
  }

  editarArtista(artista: any){}

  eliminarArtista(artista: any){
    const id = artista.id;
    console.log(id)

    this.PlaylistService.EliminarsArtista(id).subscribe(
      (data: any) => {
        // Assuming data.token exists in the response
        if (data) {
          this.artistas = data;
        } else{
          this.mostrarAlerta();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  selectedFile: File | null = null;
  selectedFile2: File | null = null;

  onFileSelected(event: any) {
    // Obtén el archivo seleccionado
    this.selectedFile = event.target.files[0];
  }

  onFileSelected2(event: any) {
    // Obtén el archivo seleccionado
    this.selectedFile2 = event.target.files[0];
  }

  
  agregarCancion(){
    

    if (!this.selectedFile) {
      alert('Selecciona una imagen primero.');
      return;
    }
    

   
    // Guardar imagen en el servidor 
    const formData = new FormData();
    formData.append('imagen', this.selectedFile);
    this.http.post<any>('http://localhost:3000/subir-imagen', formData).subscribe(
      (respuesta) => {

        if (!this.selectedFile2) {
          alert('Selecciona una imagen primero.');
          return;
        }

        this.imagen = respuesta.imageUrl;

          //guardar saudio
          const formData2 = new FormData();
          formData2.append('imagen', this.selectedFile2);
          this.http.post<any>('http://localhost:3000/subir-imagen', formData2).subscribe(
            (respuesta) => {
              
              this.cancion = respuesta.imageUrl;

               // Resto del código para guardar el producto en la base de datos
                const user = {
                  nombre: this.nombreCancion,
                  imagen: this.imagen,
                  cancion: this.cancion,
                  idArtista: this.artistaSeleccionado.id
                };

                console.log(user)

                  // Todos los campos están llenos, proceder con el registro
                  this.PlaylistService.agregarCanciones(user).subscribe(
                    (data: any) => {
                      // Assuming data.token exists in the response
                      if (data.token) {
                        this.router.navigateByUrl("/");
                      } 
                        this.artistaSeleccionado = {}; // Variable para almacenar el artista seleccionado
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
                    
                  );

                

               
            },
            (error) => {
              console.error('Error al subir la imagen:', error);
            }
          );

      },
      (error) => {
        console.error('Error al subir la imagen:', error);
      }
    );

    

  
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
