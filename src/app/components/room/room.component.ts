import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarroomComponent } from './listarroom/listarroom.component';

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [RouterOutlet, ListarroomComponent],
  templateUrl: './room.component.html',
  styleUrl: './room.component.css',
})
export class RoomComponent {
  constructor(public route: ActivatedRoute) {}
}
