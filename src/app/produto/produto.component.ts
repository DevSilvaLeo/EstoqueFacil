import { Component, OnInit } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { ProdutoService } from './produto.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Produto } from './produto';
import { UploadService } from '../upload/upload.service';
import { UploadFile } from '../upload/upload';

@Component({
    selector: "app-produto",
    templateUrl: "./produto.component.html"
})

export class ProdutoComponent implements OnInit{

    produto: Produto;
    produtos: Produto[] = [];
    produtosGrid: any;
    produtoCollection: AngularFirestoreCollection<Produto>;
    enviaProdutos: any;
    form: FormGroup;
    selectedFiles: FileList;
    currentFileUpload: UploadFile;
    percentage: number;
    
    constructor(private db: AngularFirestore, private service: ProdutoService, private fb: FormBuilder, private upService: UploadService){
        this.produto = new Produto();
    }

    createForm(){
        this.form = this.fb.group({
            idproduto: [null],
            nomeproduto: [null, [Validators.required, Validators.minLength(5)]],
            descricao: [null, [Validators.required, Validators.maxLength(500)]],
            categoria: [null, Validators.required],
            quantidade: [null],
            preco: [null, Validators.required]
        })
    }

    listarTodos(){
        
        this.produtoCollection = this.db.collection('produto');
        this.produtoCollection.valueChanges().subscribe((items) => {
            this.enviaProdutos = items as Produto[];           
        })
               
        this.service.getAll().subscribe(data =>{
            this.produtosGrid = data.map(e =>{
                return{
                    Id: e.payload.doc.id,
                    NomeProduto: e.payload.doc.data()['NomeProduto'],
                    Descricao: e.payload.doc.data()['Descricao'],
                    Categoria: e.payload.doc.data()['Categoria'],
                    Quantidade: e.payload.doc.data()['Quantidade'],
                    Preco: e.payload.doc.data()['Preco']
                }
            })
        })
    }

    private getValue(field: string){
        return this.form.controls[field].value;
    }

    private setForm(e){
        this.form.patchValue({
            idproduto: e.payload.id, 
            nomeproduto: e.payload.data()["NomeProduto"],
            descricao: e.payload.data()["Descricao"],
            categoria: e.payload.data()["Categoria"],
            quantidade: e.payload.data()["Quantidade"],
            preco: e.payload.data()["Preco"]
        })
    }


    cadastrar(){
        let item = {};
        item["NomeProduto"] = this.getValue("nomeproduto");
        item["Descricao"] = this.getValue("descricao");
        item["Categoria"] = this.getValue("categoria");
        item["Quantidade"] = this.getValue("quantidade");
        item["Preco"] = this.getValue("preco");
        let idproduto = this.getValue("idproduto");

        if(!(idproduto)){
            this.service.insertProduct(item).then(res =>{
                console.log("Gravou!!!");
                this.form.reset();
            }).catch(err =>{
                console.log(err)
            })
        }else{
            this.service.updateProduct(idproduto, item).then(res =>{
                console.log("Atualizou!!!")
                this.form.reset();
                location.reload();
            }).catch(err =>{
                console.log(err);
            })
        }
    }

    preencheForm(id:string){        
        this.service.getById(id).subscribe(e=>{  
            this.setForm(e);                        
        })        
    }

    remover(id:string){
        this.service.deleteProduct(id);
    }

    carregarImagens(event){
        this.selectedFiles = event.target.files;
        console.log(event.target.files);
    }

    anexar(){
        const file = this.selectedFiles.item(0);
        this.selectedFiles = undefined;

        this.currentFileUpload = new UploadFile(file);
        this.upService.pushFileToStorage(this.currentFileUpload).subscribe(
            percentage => {
                this.percentage = Math.round(percentage);
            },
            error => {
                console.log(error);
            }
        )
    }


    
    ngOnInit() {
        this.createForm();
        this.listarTodos();
    }
}