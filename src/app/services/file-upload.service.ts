import { Injectable, Input } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';

import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { FileUpload } from '../models/file-upload.model';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  // @Input() subcatogary:any


  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) { }

  pushFileToStorage(fileUpload: FileUpload, catogary: any, productNum: any): Observable<any> {
    let basePath = '/Bon Cafe/Product/' + catogary + '/' + localStorage.getItem('id');

    console.log(fileUpload.file.name)
    const filePath = `${basePath}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          console.log(downloadURL)
          console.log(fileUpload)
          fileUpload.image = downloadURL;
          localStorage.setItem('image', fileUpload.image)

        });

      })
    ).subscribe();

    return uploadTask.percentageChanges();
  }

  private saveFileData(fileUpload: FileUpload, fileImage: any, basePath: any): void {

    this.db.object(basePath).update({ image: fileImage });

  }

 
}
