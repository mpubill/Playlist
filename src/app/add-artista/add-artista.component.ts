import { Component } from '@angular/core';
import { PlaylistService } from "../playlistService/playlist.service";
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: 'app-add-artista',
  templateUrl: './add-artista.component.html',
  styleUrls: ['./add-artista.component.css']
})
export class AddArtistaComponent {

  constructor(public PlaylistService: PlaylistService, private router: Router, private http: HttpClient, private cookieService: CookieService) { }


  imagen: string = "";
  nombre: string = "";


  selectedFile: File | null = null;

  onFileSelected(event: any) {
    // Obtén el archivo seleccionado
    this.selectedFile = event.target.files[0];
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const imgElement = document.getElementById('imagenPrevista');
      if (imgElement) {
        imgElement.setAttribute('src', reader.result as string);
        imgElement.style.display = 'block';
      }
    };
    reader.readAsDataURL(file);
  }


  mostrarAlerta() {
    Swal.fire({
      title: 'Artista creada Correctamente',
      icon: 'success', // Puedes cambiar el ícono a tu gusto (success, error, warning, etc.)
      timer: 2500, // Tiempo de visualización en milisegundos (2 segundos)
      showConfirmButton: false // Oculta el botón de confirmación
    });
  }

  GuardarArtista(){
    if (!this.selectedFile) {
      alert('Selecciona una imagen primero.');
      return;
    }

   
    // Guardar imagen en el servidor 
    const formData = new FormData();
    formData.append('imagen', this.selectedFile);

    this.http.post<any>('http://localhost:3000/subir-imagen', formData).subscribe(
      (respuesta) => {
        // Aquí puedes manejar la respuesta del servidor que debería contener la URL de la imagen cargada.

        // Almacena la URL de la imagen en imagen_url
        this.imagen = respuesta.imageUrl;


        // Resto del código para guardar el producto en la base de datos
        const user = {
          nombre: this.nombre,
          imagen: respuesta.imageUrl
        };


        

        // Todos los campos están llenos, proceder con el registro
        this.PlaylistService.agregarArtista(user).subscribe(
          (data: any) => {
            // Assuming data.token exists in the response
            if (data.token) {
              this.router.navigateByUrl("/");
            } 

            this.mostrarAlerta();
            this.router.navigateByUrl("/ver-artista");
          },
          
        );



      },
      (error) => {
        console.error('Error al subir la imagen:', error);
      }
    );

  }

}
