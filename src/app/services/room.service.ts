import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { Room } from '../model/Room';
import { HttpClient } from '@angular/common/http';
const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  private url = `${base_url}/habitaciones`;
  private listaCambio = new Subject<Room[]>();
  constructor(private httpClient: HttpClient) {}
  list() {
    return this.httpClient.get<Room[]>(this.url);
  }
  insert(r: Room) {
    return this.httpClient.post(this.url, r);
  }
  setList(listaNueva: Room[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id: number) {
    return this.httpClient.get<Room>(`${this.url}/${id}`);
  }
  update(r: Room) {
    return this.httpClient.put(this.url, r);
  }
  eliminar(id: number) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }
}
