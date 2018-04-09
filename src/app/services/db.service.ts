import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import * as _ from 'lodash';
import {debug} from 'util';

@Injectable()
export class DbService {

  constructor(private db: AngularFireDatabase) {
  }

  createNewUserEntry({uid, username, email, photoURL}) {
    this.db.object(`/users/${uid}`).set({uid, username, email, photoURL});
  }

  postNewPost(details) {
    const date = new Date().getTime();
    const {key} = this.db.list('/posts').push({...details, date});
    this.db.object(`/posts/${key}`).update({key});
  }

  getPosts(sortBy = '/date') {
    return this.db.list('/posts', ref => ref.orderByChild(sortBy)).valueChanges();
  }

  getMePosts(uid) {
    return this.db.list('/posts', ref => ref.orderByChild('uid').equalTo(uid)).valueChanges();
  }

  getUser(uid, me) {
    const path = `/users/${uid}`;
    if (me.uid !== uid) {
      this.db.object(path).valueChanges().first().subscribe(user => {
        const views = user['views'] ? user['views'] + 1 : 1;
        this.db.object(path).update({views});
      });
    }
    return this.db.object(path).valueChanges();
  }

  sendMessage(uid, sender, msg) {
    const date = new Date().getTime();
    delete sender['msgs'];
    this.db.list(`/users/${uid}/msgs`).push({msg, date, sender});
    this.db.object(`/users/${uid}`).valueChanges().first().subscribe((u: any) => {
      const notifications = u.notifications ? u.notifications + 1 : 1;
      this.db.object(`/users/${uid}`).update({notifications});
    });
  }

  getMessages(uid) {
    const notifications = 0;
    this.db.object(`/users/${uid}`).update({notifications});
    return this.db.list(`/users/${uid}/msgs`).valueChanges();
  }

  zeroNotification(uid) {
    const notifications = 0;
    this.db.object(`/users/${uid}`).update({notifications});
  }


  likePost(postId, userDetails) {
    this.db.list(`/posts/${postId}/likes`).push(userDetails);
    this.db.object(`/posts/${postId}`).valueChanges().first().subscribe(post => {
      this.db.object(`/posts/${postId}`).update({'like': post['like'] ? post['like'] + 1 : 1});
    });
  }

  //

  dislikePost(postId, userDetails) {
    const {uid} = userDetails;
    const listObj = this.db.object(`/posts/${postId}/likes`);
    listObj.valueChanges().first().subscribe(results => {
      _.forEach(results, (like, key) => {
        if (like.uid === uid) {
          this.db.list(`/posts/${postId}/likes`).remove(key);
          this.db.object(`/posts/${postId}`).update({'like': Object.keys(results).length - 1});
        }
      });
    });
  }

}
