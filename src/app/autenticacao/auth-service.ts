import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Autenticacao } from './autenticacao';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    private user: Observable<firebase.User>;
    public usuarioLogado: firebase.User;

    constructor(private firebaseAuth: AngularFireAuth, private router: Router){
        this.usuarioLogado = null;
        this.user = firebaseAuth.authState;
        this.user.subscribe(response => {
            //console.log(response)
            if(response){
                this.usuarioLogado = response;
            }else{
                this.usuarioLogado = null;
            }
        })
    }

    entrar(autenticacao : Autenticacao){
        return this.firebaseAuth.auth.signInWithEmailAndPassword(autenticacao.email, autenticacao.senha);
    }

    sair(){
       this.firebaseAuth.auth.signOut().then(res => {
           this.router.navigate(['login']);
       })
    }

    estalogado(){
        if(this.usuarioLogado === null){
            return false;
        }else{
            return true;
        }
    }

    verifyEmailResetPassword(email){
        return this.firebaseAuth.auth.sendPasswordResetEmail(email);
    }

}