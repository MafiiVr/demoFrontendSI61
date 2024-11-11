import { ReportesumaComponent } from './components/reportes/reportesuma/reportesuma.component';
import { Routes } from '@angular/router';
import { RoomComponent } from './components/room/room.component';
import { CreaeditaroomComponent } from './components/room/creaeditaroom/creaeditaroom.component';
import { DeviceComponent } from './components/device/device.component';
import { CreaeditaComponent } from './components/device/creaedita/creaedita.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { seguridadGuard } from './guard/seguridad.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'ambientes',
    component: RoomComponent,
    children: [
      { path: 'nuevo', component: CreaeditaroomComponent },
      { path: 'ediciones/:id', component: CreaeditaroomComponent },
    ],
    canActivate: [seguridadGuard],
  },
  {
    path: 'dispositivos',
    component: DeviceComponent,
    children: [{ path: 'nuevo', component: CreaeditaComponent }],
    canActivate: [seguridadGuard],
  },
  {
    path: 'reportes',
    component: ReportesComponent,
    children: [
      {
        path: 'reportesumas',
        component: ReportesumaComponent,
      },
    ],
    canActivate: [seguridadGuard],
  }
  ,
  {
    path: 'homes',
    component: HomeComponent,
    canActivate: [seguridadGuard], // solo construcciones, se debe agregar a cada uno
  },
];
