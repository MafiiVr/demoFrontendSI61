import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListardeviceComponent } from './listardevice/listardevice.component';

@Component({
  selector: 'app-device',
  standalone: true,
  imports: [RouterOutlet, ListardeviceComponent],
  templateUrl: './device.component.html',
  styleUrl: './device.component.css'
})
export class DeviceComponent {
  constructor(public route: ActivatedRoute) {}
}
