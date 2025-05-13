import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FotoDetalleService {
  private data: any;

  setFotoData(data: any) {
    this.data = data;
  }

  getFotoData() {
    return this.data;
  }
}