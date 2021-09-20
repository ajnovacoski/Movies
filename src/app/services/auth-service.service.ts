import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { auth } from 'firebase';
import { User } from '../class/user';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  userData : User;
  constructor(
    public afStore : AngularFirestore,
    public ngfireAuth : AngularFireAuth,
    public ngZone : NgZone,
    public router : Router
  ) { 
    this.ngfireAuth.authState.subscribe((user) => {
      if(user){
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'))
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
  }

  //login com email/senha
  public signIn(email: string, password: string){
    return this.ngfireAuth.signInWithEmailAndPassword(email, password);
  }

  public signUpWithEmailAndPass(email: string, password: string){
    return this.ngfireAuth.createUserWithEmailAndPassword(email, password);
  }
  public signInWithGoogle(){
    this.AuthLogin(new auth.GoogleAuthProvider())
  }
  // login com pop-up (face, google, etc)
  public AuthLogin(provider){
    return this.ngfireAuth.signInWithPopup(provider).then((result) => {
      this.ngZone.run(() => {
        this.router.navigate(['/home'])
      });
    }).catch((error) => {
      console.log(error);
    });
  }

  public setUserData(user){
    const userRef : AngularFirestoreDocument<any> = 
    this.afStore.doc(`users/${user.uid}`);
    const userDataConst : User = {
      uid : user.uid,
      email : user.email,
      displayName : user.displayName,
      photoURL : user.photoURL,
      emailVerified : user.emailVerified
    }
    return userRef.set(userDataConst, {merge : true})
  }

  public estaLogado() : boolean{
    const user = JSON.parse(localStorage.getItem('user'))
    return (user != null) ? true : false;
  }

  public getUserLogado(): User{
    const user = JSON.parse(localStorage.getItem('user'));
    return (user != null) ? user : null;
  }

  public recuperarSenha(email: string){
    return this.ngfireAuth.sendPasswordResetEmail(email)
    .then(() => {
      console.log("Enviado por e-mail");       
    }).catch((error) => {
      console.log(error);
    })
  }

  //logout 
  public signOut(){
    return this.ngfireAuth.signOut()
    .then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['signin']);
    }).catch((error) => {
     console.log(error);
   })
  }
}
