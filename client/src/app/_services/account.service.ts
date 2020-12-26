import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl = 'https://localhost:5001/api/';
  private currentUsrSrc = new ReplaySubject<User>(1);
  currentUser$ = this.currentUsrSrc.asObservable();

  constructor(private http: HttpClient) {}

  login(model: any) {
    return this.http.post(this.baseUrl + 'account/login', model).pipe(
      map((res: User) => {
        const usr = res;
        if (usr) {
          localStorage.setItem('user', JSON.stringify(usr));
          this.currentUsrSrc.next(usr);
        }
      })
    );
  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'account/register', model).pipe(
      map((res: User) => {
        const usr = res;
        if (usr) {
          localStorage.setItem('user', JSON.stringify(usr));
          this.currentUsrSrc.next(usr);
        }
      })
    );
  }

  setCurrentUser(user: User) {
    this.currentUsrSrc.next(user);
  }

  logOut() {
    localStorage.removeItem('user');
    this.currentUsrSrc.next(null);
  }
}
