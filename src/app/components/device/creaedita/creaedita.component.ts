import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterLink } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Device } from '../../../model/Device';
import { DeviceService } from '../../../services/device.service';
import { RoomService } from '../../../services/room.service';
import { Room } from '../../../model/Room';

@Component({
  selector: 'app-creaedita',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    RouterLink,
    ReactiveFormsModule,
    MatSelectModule,
    CommonModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './creaedita.component.html',
  styleUrl: './creaedita.component.css',
})
export class CreaeditaComponent {
  form: FormGroup = new FormGroup({});
  device: Device = new Device();
  listaAmbientes: Room[] = [];

  mensaje: string = '';
  tipos: { value: string; viewValue: string }[] = [
    { value: 'Domésticos', viewValue: 'Domésticos' },
    { value: 'Entretenimiento', viewValue: 'Entretenimiento' },
    { value: 'Seguridad', viewValue: 'Seguridad' },
  ];
  constructor(
    private dS: DeviceService,
    private router: Router,
    private formBuilder: FormBuilder,
    private rS: RoomService
  ) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      hnombre: ['', Validators.required],
      htipo: ['', Validators.required],
      hprecio: ['', Validators.required],
      hfecha: ['', Validators.required],
      hnumero: ['', Validators.required],
      hambiente: ['', Validators.required],
    });
    this.rS.list().subscribe((data) => {
      this.listaAmbientes = data;
    });
  }
  aceptar(): void {
    if (this.form.valid) {
      this.device.nameDevice = this.form.value.hnombre;
      this.device.typeDevice = this.form.value.htipo;
      this.device.priceDevice = this.form.value.hprecio;
      this.device.numberDeviceMaintenance = this.form.value.hnumero;
      this.device.purchaseDateDevice = this.form.value.hfecha;
      this.device.room.idRoom = this.form.value.hambiente;

      this.dS.insert(this.device).subscribe((data) => {
        this.rS.list().subscribe((d) => {
          this.rS.setList(d);
        });
      });
      this.router.navigate(['dispositivos']);

    }else{
      this.mensaje = 'Por favor, complete todos los campos obligatorios.';
    }
    
  }
}
