import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject, Observable } from "rxjs/Rx";

import { User } from "./user.interface";

declare var firebase: any;

@Injectable() 
export class AuthService {
  constructor(private router: Router){}

  signupUser(user: User) {
    firebase.auth().createUserWithEmailAndPassword(user.email, user.password).catch(function(error) {
      // Handle Errors here.
      console.log(error);
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
  }

  signinUser(user: User) {
    firebase.auth().signInWithEmailAndPassword(user.email, user.password).catch(function(error) {
      // Handle Errors here.
      console.log(error);
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
  }

  logout() {
    firebase.auth().signOut();
    this.router.navigate(['/signin']);
  }

  //isAuthenticated() {
  isAuthenticated(): Observable<boolean> {
    const subject = new Subject<boolean>();
    firebase.auth().onAuthStateChanged(function(user){
      if (user) {
        subject.next(true);
      } else {
        subject.next(false);
      }
    });
    return subject.asObservable();
    /*var user = firebase.auth().currentUser;

    if (user) {
      return true;
    } else {
      return false;
    }*/
  }
}

