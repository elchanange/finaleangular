import {Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {debug} from 'util';
import {Router} from '@angular/router';
import {AngularFireDatabase} from 'angularfire2/database';
import {Subject} from 'rxjs/Subject';
import * as _ from 'lodash';

@Injectable()
export class AuthService {

  _user: any = false;
  _userRow: any = {};
  userSubjet = new Subject();

  get userObserv() {
    return this.userSubjet.asObservable();
  }

  get stateChanged() {
    return this.afAuth.authState;
  }

  get user() {
    if (!this._user) {
      return this._user;
    }
    const {uid, photoURL, displayName, email} = this._user;
    return {uid, photoURL, displayName, email, ...this._userRow};
  }

  get loading() {
    return this._user === false;
  }

  constructor(private afAuth: AngularFireAuth, private router: Router, private db: AngularFireDatabase) {
    this.afAuth.authState.subscribe((user) => {
      this._user = user;
      if (user) {
        this.db.object(`/users/${user.uid}`).update(this.user);
        this.db.object(`/users/${user.uid}`).valueChanges().subscribe(ud => {
          this._userRow = ud;
          this.userSubjet.next(this.user);
        });
      } else {
        this._userRow = {};
      }
    });
  }

  redirectHome() {
    if (this._user) {
      this.router.navigateByUrl('');
    } else {
      this.router.navigateByUrl('/login');
    }
  }


  async login({email, password}) {
    try {
      const t = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
      return 'Logged in successfuly';
    } catch (e) {
      return 'One of the params is wrong, please try again';
    }
  }


  async register({email, password, password2}) {
    if (password !== password2) {
      return new Promise((r, s) => r({message: 'passwords are not the same'}));
    }
    try {
      return await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
    } catch (e) {
      return e;
    }
  }

  async updateUserInfo(info) {
    const currentUser = this.afAuth.auth.currentUser;
    if (currentUser) {
      this.db.object(`users/${currentUser.uid}`).update(info);
      await currentUser.updateProfile(info);
      this.fetchAllPosts(info);
      return;
    }
    const error = 'No user signed in';
    return {error};
  }

  async fetchAllPosts(info) {
    const {uid} = this.afAuth.auth.currentUser;
    this.db.object('/posts').valueChanges().first().subscribe(posts => {
      _.filter(posts, {uid}).forEach(post => {
        this.db.object(`/posts/${post.key}`).update(info);
      });
    });

    this.db.object('/users').valueChanges().first().subscribe(users => {
      _.forEach(users, (user, userKey) => {
        _.filter(user['msgs'] || [], {sender: {uid}}).forEach((msg, msgKey) => {
          const msgK = Object.keys(user['msgs'])[msgKey];
          this.db.object(`users/${userKey}/msgs/${msgK}/sender`).update(info);
        });
      });
    });
  }

  async changePassword(currentPass, pass) {
    const {email} = this.user;
    await this.afAuth.auth.signInWithEmailAndPassword(email, currentPass);
    return this.afAuth.auth.currentUser.updatePassword(pass);
  }

  async disconnect() {
    this.afAuth.auth.signOut();
    window.localStorage.clear();
  }

}
