import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { Device } from '../model/Device';
import { HttpClient } from '@angular/common/http';
import { QuantityDeviceByRoomDTO } from '../model/QuantityDeviceByRoomDTO';
import { AmountByRoomDTO } from '../model/AmountByRoomDTO';
const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  private url = `${base_url}/dispositivos`;
  
  private listaCambio = new Subject<Device[]>();

  constructor(private httpClient: HttpClient) {}

  list() {
    return this.httpClient.get<Device[]>(this.url);
  }

  insert(d: Device) {
    return this.httpClient.post(this.url, d);
  }
  setList(listaNueva: Device[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  getCantidad(): Observable<QuantityDeviceByRoomDTO[]> {
    return this.httpClient.get<QuantityDeviceByRoomDTO[]>(
      `${this.url}/cantidades`
    );
  }
  getSumas(): Observable<AmountByRoomDTO[]> {
    return this.httpClient.get<AmountByRoomDTO[]>(
      `${this.url}/sumas`
    );
  }

}
