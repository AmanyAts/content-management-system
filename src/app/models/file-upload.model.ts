export class FileUpload {
    key!: string;
    name!: string;
    url!: string;
    file!: File;
    image!:string
  
    constructor(file: File) {
      this.file = file;
    }
}
