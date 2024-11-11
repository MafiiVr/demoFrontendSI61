import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ReportecantidadComponent } from './reportecantidad/reportecantidad.component';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [RouterOutlet,ReportecantidadComponent],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css'
})
export class ReportesComponent {
  constructor(public route: ActivatedRoute) {}

}
