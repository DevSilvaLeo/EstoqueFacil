import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Usuario } from './usuario';
import { UsuarioService } from './usuario-service';

@Component({
    selector: "app-usuario",
    templateUrl: "./usuario.component.html"
})

export class UsuarioComponent implements OnInit{

    usuario: Usuario;
    usuarios: Usuario[] = [];
    usuarioCollection: AngularFirestoreCollection<Usuario>;
    form: FormGroup;

    constructor(private db: AngularFirestore, private service: UsuarioService, private fb: FormBuilder) {
        this.usuario = new Usuario(); 
    }

    createForm(){
        this.form = this.fb.group({
            nome: ["", [Validators.required, Validators.minLength(5)]],
            email: ["", Validators.required],
            senha: ["", Validators.minLength(6)]
        })
    }

    private getValue(field: string){
        return this.form.controls[field].value;
    }

    cadastrar(){
        let item = {};
        item['Nome'] = this.getValue("nome");
        item['Email'] = this.getValue("email");
        item['Senha'] = this.getValue("senha");

        this.service.insertUser(item).then((res) => {
            this.service.signIn(this.getValue("email"), this.getValue("senha"));
            console.log("Inserido no firebase", res);
            this.form.reset();
        })
        
    }

    listarTodos(){
        this.usuarioCollection = this.db.collection('usuario');
        this.usuarioCollection.valueChanges().subscribe((items)=>{
            this.usuarios = items as Usuario[];
        })
    }

    ngOnInit(){
        this.createForm();
        this.listarTodos();
    }
}