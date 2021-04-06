import { Component, OnInit } from '@angular/core';
import { AuthService } from '../autenticacao/auth-service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: "app-principal",
    templateUrl: "./principal.component.html"
})

export class PrincipalComponent implements OnInit{
    
    constructor(private authservice: AuthService, private route: ActivatedRoute){
        
    }
    
    ngOnInit(): void{
        //console.log(this.route.snapshot.paramMap.get('logged'));
        console.log(this.authservice.usuarioLogado);
    }

    logout(){
        this.authservice.sair();
    }
}