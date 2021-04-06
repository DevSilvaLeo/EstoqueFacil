import { Component, OnInit } from '@angular/core';
import { Autenticacao } from '../autenticacao/autenticacao';
import { Router } from '@angular/router';
import { AuthService } from '../autenticacao/auth-service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit{
    autenticacao: Autenticacao;

    constructor(private router: Router, public authservice: AuthService){}
    
    ngOnInit(){
        this.autenticacao = new Autenticacao();
    }

    login(){
        event.preventDefault();        
        if(this.usuarioValido(this.autenticacao)){
            this.authservice.entrar(this.autenticacao).then((response) => {
                console.log(response);
                this.router.navigate(['principal', {logged: true}])
            }).catch(error => {
                console.log(error, "Digite o login e a senha");
                this.router.navigate(['/']);
            })
        
        }else{
            //this.alert.error("Usuário Inexistente, por favor verfique.")
            console.log('Usuário Inexistente!!')
        }
        
    }

    usuarioValido(autenticacao: Autenticacao): boolean{
        if(autenticacao){
            if(!autenticacao.email || !autenticacao.senha){
                return false;
            }else{
                return true;
            }
        }
    }

    resetSenha(){
        this.authservice.verifyEmailResetPassword(this.autenticacao.email).then(res =>{
            console.log('Email de reset enviado!!!!');
        }).catch(err =>{
            if(err.code == 'auth/invalid-email'){
                console.log("invalido", err.message);
                location.reload();
            }else if(err.code == 'auth/user-not-found'){
                console.log("não encontrado", err.message);
            }
            console.log(err);
        })
    }

    
}