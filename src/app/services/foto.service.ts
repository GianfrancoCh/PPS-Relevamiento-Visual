import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class FotoService {

  constructor() { }

  public async addNewToGallery():Promise<String | undefined> {
    // Take a photo
    const image:Photo = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
    });
    return image.webPath
  }
}
