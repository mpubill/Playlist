import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";
import { routing } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AddCancionesComponent } from './add-canciones/add-canciones.component';
import { AddPlaylistsComponent } from './add-playlists/add-playlists.component';
import { VerPlaylistComponent } from './ver-playlist/ver-playlist.component';
import { VerCancionesComponent } from './ver-canciones/ver-canciones.component';
import { AccionesCancionesComponent } from './acciones-canciones/acciones-canciones.component';
import { EditarCancionesComponent } from './editar-canciones/editar-canciones.component';
import { AddArtistaComponent } from './add-artista/add-artista.component';
import { VerArtistaComponent } from './ver-artista/ver-artista.component';
import { EditarPlaylistComponent } from './editar-playlist/editar-playlist.component';
import { EditarArtistaComponent } from './editar-artista/editar-artista.component';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavbarComponent,
    AddCancionesComponent,
    AddPlaylistsComponent,
    VerPlaylistComponent,
    VerCancionesComponent,
    AccionesCancionesComponent,
    EditarCancionesComponent,
    AddArtistaComponent,
    VerArtistaComponent,
    EditarPlaylistComponent,
    EditarArtistaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    HttpClientModule ,
    // Importa el AppRoutingModule que contiene tus rutas
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})



export class AppModule { }
