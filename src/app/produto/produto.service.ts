import { Injectable } from "@angular/core";
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable({
    providedIn: 'root'
})

export class ProdutoService{
    constructor(private db: AngularFirestore){
    }

    public insertProduct(produto){
        return this.db.collection("produto").add(produto);
    }

    public getAll(){
        return this.db.collection("produto").snapshotChanges();
    }

    public getById(id:string){
        return this.db.doc("produto/" + id).snapshotChanges();
    }

    public updateProduct(id, produto){
        return this.db.doc("produto/" + id).update(produto);
    }

    public deleteProduct(id:string){
        return this.db.doc("produto/" + id).delete();
    }
}