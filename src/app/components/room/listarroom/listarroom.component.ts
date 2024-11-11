import { Component } from '@angular/core';
import { Room } from '../../../model/Room';
import { RoomService } from '../../../services/room.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-listarroom',
  standalone: true,
  imports: [MatTableModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,CommonModule
  ],
  templateUrl: './listarroom.component.html',
  styleUrl: './listarroom.component.css',
})
export class ListarroomComponent {
  dataSource: MatTableDataSource<Room> = new MatTableDataSource();
  noResults: boolean = false; 


  displayedColumns: string[] = [
    'c1',
    'c2',
    'c3',
    'accion01',
     'accion02'
  ];

  constructor(private rS: RoomService) {}
  ngOnInit(): void {
    this.rS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.rS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
  eliminar(id: number) {
    this.rS.eliminar(id).subscribe((data) => {
      this.rS.list().subscribe((data) => {
        this.rS.setList(data);
      });
    });
  }
 
}
