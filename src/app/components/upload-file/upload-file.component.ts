import { Component, Input, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { FileUpload } from 'src/app/models/file-upload.model';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {
  selectedFiles!: any;
  currentFileUpload!: FileUpload;
  percentage!: number;
  @Input() catogary:any
  @Input() productNum:any
  url= localStorage.getItem('image')


  constructor(private uploadService: FileUploadService) { }

  ngOnInit(): void {
  }
  selectFile(event:any): void {
    this.selectedFiles = event.target.files;
    this.uploadImage(event)
  }
  upload(): void {
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;

    this.currentFileUpload = new FileUpload(file);
    this.uploadService.pushFileToStorage(this.currentFileUpload,this.catogary,this.productNum).subscribe(
      percentage => {
        console.log(percentage)
        this.percentage = Math.round(percentage);
      },
      error => {
        console.log(error);
      }
    );
  }

  uploadImage(event:any){
    let fileType = event.target.files[0].type;
    if (fileType.match(/image\/*/)) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
      };
    } else {
      window.alert('Please select correct image format');
    }
  }

}
