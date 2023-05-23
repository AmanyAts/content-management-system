import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {



  @Output() selectCatogary= new EventEmitter<{ name: string }>()

  bookTitle: string='test8';
  listOfcatogaries:any={}


  categories:any=['All Products']

  constructor(private productsService: ProductsService) { }



  catogaryGroup:any = new FormGroup({

    catogary:new FormControl('',Validators.required)



  })



  ngOnInit(): void {

   



    this.productsService.getProducts('All Products').subscribe(res=>{
     

this. listOfcatogaries = res
    for(let key in this.listOfcatogaries){
      this.categories.push(key)
      Object.keys(this.listOfcatogaries[key]).map((x,index)=>{
       let subCatogary=  Object.values(this.listOfcatogaries[key][x]).some( 
          (value:any) => { 
            return  value.name !== undefined
          })
          if(subCatogary==true){
            this.categories.push(key+'/'+x)

          }
      })
  }

   

    })



  }

  afterSelect(){
    // so parent can receive output variable
    this.selectCatogary.emit({ name: this.catogaryGroup.controls['catogary'].value });



  }



}
