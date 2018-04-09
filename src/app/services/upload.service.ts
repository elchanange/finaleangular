import {Injectable} from '@angular/core';
import {FirebaseListObservable} from 'angularfire2/database-deprecated';
import {AngularFireDatabase} from 'angularfire2/database';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs/Observable';

export class Upload {

  $key: string;
  file: File;
  name: string;
  url: string;
  progress: number;
  createdAt: Date = new Date();

  constructor(file: File) {
    this.file = file;
  }
}

@Injectable()
export class UploadService {
  basePath = '/uploads';
  constructor(private db: AngularFireDatabase) {
  }

  uploads: FirebaseListObservable<Upload[]>;

  pushUpload(upload: Upload, path) {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${path}`).put(upload.file);
    return new Promise((resolve, reject) => {
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        () => {
        },
        (error) => {
          // upload failed
          reject(error);
        },
        () => {
          upload.url = uploadTask.snapshot.downloadURL;
          upload.name = upload.file.name;
          const pieces = this.saveFileData(upload);
          resolve(upload.url);
        }
      );
    });

  }


  // Writes the file details to the realtime db
  private saveFileData(upload: Upload) {
    const resp = this.db.list(`${this.basePath}/`).push(upload);
    return resp.path['pieces_'];
  }
}
