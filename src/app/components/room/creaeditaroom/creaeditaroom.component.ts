import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Room } from '../../../model/Room';
import { RoomService } from '../../../services/room.service';
import { Router } from '@angular/router';
import { ActivatedRoute, Params, RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-creaeditaroom',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    RouterLink,
    ReactiveFormsModule,
    MatSelectModule,
    CommonModule,
    MatButtonModule,
  ],
  templateUrl: './creaeditaroom.component.html',
  styleUrl: './creaeditaroom.component.css',
})
export class CreaeditaroomComponent {
  form: FormGroup = new FormGroup({});
  room: Room = new Room();
  mensaje: string = '';
  id: number = 0;
  edicion: boolean = false;
  niveles: { value: string; viewValue: string }[] = [
    { value: 'piso1', viewValue: 'Piso 01' },
    { value: 'piso2', viewValue: 'Piso 02' },
    { value: 'sotano1', viewValue: 'Sótano 01' },
    { value: 'sotano2', viewValue: 'Sótano 02' },
  ];
  constructor(
    private rS: RoomService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.form = this.formBuilder.group({
      hcodigo: [''],
      hnombre: ['', Validators.required],
      hubicacion: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      hcodigo: [''],
      hnombre: ['', Validators.required],
      hubicacion: ['', Validators.required],
    });
  }
  aceptar(): void {
    if (this.form.valid) {
      this.room.idRoom = this.form.value.hcodigo;
      this.room.nameRoom = this.form.value.hnombre;
      this.room.ubicationRoom = this.form.value.hubicacion;
      if (this.edicion) {
        this.rS.insert(this.room).subscribe((data) => {
          this.rS.list().subscribe((d) => {
            this.rS.setList(d);
          });
        });
      } else {
        this.rS.update(this.room).subscribe((data) => {
          this.rS.list().subscribe((d) => {
            this.rS.setList(d);
          });
        });
      }

      this.router.navigate(['ambientes']);
    } else {
      this.mensaje = 'Por favor, complete todos los campos obligatorios.';
    }
  }

  init() {
    if (this.edicion) {
      this.rS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hcodigo: new FormControl(data.idRoom),
          hnombre: new FormControl(data.nameRoom),
          hubicacion: new FormControl(data.ubicationRoom),
        });
      });
    }
  }
}
