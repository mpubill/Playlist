import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AddPlaylistsComponent } from './add-playlists/add-playlists.component';
import { AddCancionesComponent } from './add-canciones/add-canciones.component';
import { VerPlaylistComponent } from './ver-playlist/ver-playlist.component';
import { VerCancionesComponent } from './ver-canciones/ver-canciones.component';
import { AccionesCancionesComponent } from './acciones-canciones/acciones-canciones.component';
import { EditarCancionesComponent } from './editar-canciones/editar-canciones.component';
import { AddArtistaComponent } from './add-artista/add-artista.component';
import { VerArtistaComponent } from './ver-artista/ver-artista.component';


const appRoutes: Routes = [

  { path: "", component: DashboardComponent},
  { path: "add-playlist", component: AddPlaylistsComponent},
  { path: "add-canciones", component: AddCancionesComponent},
  { path: "ver-playlist", component: VerPlaylistComponent},
  { path: "ver-canciones", component: VerCancionesComponent},
  { path: "acciones", component: AccionesCancionesComponent},
  { path: "editar", component: EditarCancionesComponent},
  { path: "add-artista", component: AddArtistaComponent},
  { path: "ver-artista", component: VerArtistaComponent},
];

export const routing = RouterModule.forRoot(appRoutes);