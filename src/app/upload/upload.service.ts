import { Injectable } from "@angular/core";
import { AngularFireStorage } from 'angularfire2/storage';
import { UploadFile } from './upload';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class UploadService {
    private pasta = '/MKProducts';

    constructor(private storage: AngularFireStorage){

    }

    pushFileToStorage(upload: UploadFile): Observable<number> {
        console.log(upload);
        const filePath = `${this.pasta}/${upload.file.name}`;
        const storageRef = this.storage.ref(filePath);
        const uploadTask = this.storage.upload(filePath, upload.file);
      
        uploadTask.snapshotChanges().pipe(finalize(() => {
            storageRef.getDownloadURL().subscribe(downloadURL => {
              console.log('File available at', downloadURL);
              upload.url = downloadURL;
              upload.nomeArquivo = upload.file.name;
              //this.saveFileData(upload);
              console.log(upload.url);
              console.log(upload);
              
            });
          })
        ).subscribe();
     
        return uploadTask.percentageChanges();
      
      }





}