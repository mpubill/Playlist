import { Component, OnInit } from '@angular/core';
import { PlaylistService } from "../playlistService/playlist.service";
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: 'app-add-canciones',
  templateUrl: './add-canciones.component.html',
  styleUrls: ['./add-canciones.component.css']
})
export class AddCancionesComponent {

  constructor(public PlaylistService: PlaylistService, private router: Router, private http: HttpClient, private cookieService: CookieService) { }
 
  categorias: any[] = [];

  nombre: string = "";
  artista: string = ""; 
  imagen: string = "";
  cancion: string = "";
  idplaylist: number = 0; 


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


  mostrarAlerta() {
    Swal.fire({
      title: 'Cancion creada Correctamente',
      icon: 'success', // Puedes cambiar el ícono a tu gusto (success, error, warning, etc.)
      timer: 2500, // Tiempo de visualización en milisegundos (2 segundos)
      showConfirmButton: false // Oculta el botón de confirmación
    });
  }


  guardarProducto() {

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
                  nombre: this.nombre,
                  artista: this.artista,
                  imagen: this.imagen,
                  cancion: this.cancion,
                  idplaylist: this.idplaylist,
                };

                console.log(user)

                  // Todos los campos están llenos, proceder con el registro
                  this.PlaylistService.agregarCanciones(user).subscribe(
                    (data: any) => {
                      // Assuming data.token exists in the response
                      if (data.token) {
                        this.router.navigateByUrl("/");
                      } 

                      this.mostrarAlerta();
                      this.router.navigateByUrl("/ver-playlist");
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

    

  };

}


        
