export class UploadFile{
    id: string;
    nomeArquivo: string;
    url: string;
    file: File;

    constructor(file:File){
        this.file = file;
    }
}