import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  cookies: any;

  constructor(private http: HttpClient) { }

  agregarPlaylist(user: any): Observable<any> {
    return this.http.post('http://localhost:8080/api/playlist/create', user);
  }


  obtenerPlaylist() {
    return this.http.get(
      'http://localhost:8080/api/playlist/all'
    );
  }

  agregarCanciones(user: any): Observable<any> {
    return this.http.post('http://localhost:8080/api/cancion/create', user);
  }

  agregarArtista(user: any): Observable<any> {
    return this.http.post('http://localhost:8080/api/artista/create', user).pipe(
    catchError(error => {
      console.error('Error al agregar el artista:', error);
      return throwError(error);
    })
  );
  }

  obtenerlistaArtista() {
    return this.http.get(
      '  http://localhost:8080/api/artista/all'
    );
  }
  
  EliminarsArtista(user: any): Observable<any> {
    const url = `http://localhost:8080/api/artista/delete/${user}`;

    return this.http.delete(url);
  }

  obtenerListCanciones(user: any): Observable<any> {
    const url = `https://localhost:7078/api/cancion/GetAll?idplaylist=${user}`;
    return this.http.get(url);
  }

  


  obtenerCanciones() {
    return this.http.get(
      '  http://localhost:8080/api/cancion/all'
    );
  }

  EliminarsPlaylist(user: any): Observable<any> {
    const url = `http://localhost:8080/api/playlist/delete/${user}`;

    return this.http.delete(url);
  }

  EliminarsCancion(user: any): Observable<any> {
    const url = `http://localhost:8080/api/cancion/delete/${user}`;

    return this.http.delete(url);
  }

  obtenerPlaylistPorId(id: string): Observable<any> {
    return this.http.get(`http://localhost:8080/api/playlist/${id}`);
  }

  actualizarPlaylist(id: number, playlist: any): Observable<any> {
    return this.http.put(`http://localhost:8080/api/playlist/edit/${id}`, playlist);
  }

  
  
  EditarCanciones(idProducto: number, datosActualizados: any): Observable<any> {
    const url = `https://localhost:7078/api/cancion/Actualizar/${idProducto}`;

    return this.http.put(url, datosActualizados);
  }



  obtenerCancionporId(user: any): Observable<any> {
    const url = `https://localhost:7078/api/cancion/GetPorId?id=${user}`;
    return this.http.get(url);
  }

  guardarCancionEnPlaylist(user: any): Observable<any> {
    return this.http.post('http://localhost:8080/api/cancionesplaylists/create', user);
  }
  
  


  
  
  
}
