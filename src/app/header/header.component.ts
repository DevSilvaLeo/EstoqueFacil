import { Component, OnInit } from '@angular/core';
import { AuthService } from '../autenticacao/auth-service';

@Component({
    selector: 'app-topo',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit{
    
    constructor(private service: AuthService){ }


    ngOnInit(){
        
    }

    logout(){
        this.service.sair();
    }
}