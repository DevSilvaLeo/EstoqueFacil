import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable({
    providedIn: "root"
})

export class UsuarioService{
    constructor(private fireAuth: AngularFireAuth, private db: AngularFirestore){
    }

    public signIn(email, senha){
        return this.fireAuth.auth.createUserWithEmailAndPassword(email, senha).then(response =>{
            console.log(response);
        })
    }

    public resetPassword(email){
        return this.fireAuth.auth.sendPasswordResetEmail(email).then(response =>{
            console.log(response);
        }).catch(error =>{            
            if(error.code == 'auth/user-not-found'){
                console.log(error.message);
            }else if(error.code == 'auth/invalid-email'){
                console.log(error.message);
            }
            console.log(error);
        })
    }

    public insertUser(user){
        return this.db.collection("usuario").add(user);
    }
    
    /*
    public deleteUser(userID){
        return this.fireAuth
    }
    */
}