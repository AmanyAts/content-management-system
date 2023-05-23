import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../../services/products.service'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private productsService: ProductsService ) { }
  productsRes: any = {}
  products: any = []
  catogary:any
  searchWord:any= ''
  selectedCatogaryFunction(eventData: { name: string }) {
    this.products=[]
    this.catogary= eventData.name
    this.DisplayCatogary()
    return eventData.name
  }

  ngOnInit(): void {
    localStorage.setItem('search','')
   this.DiaplayAllProudcts()
 
  }

  DiaplayAllProudcts=()=>{
    this.productsService.getProducts('All Products').subscribe(res => {
      this.productsRes = res
      for(let key in this.productsRes){ //key is coffee, other drink etc..
        this.displayProducts(this.productsRes[key],key)
    }
    localStorage.setItem('products',this.products[0].name)



    })
  }

  DisplayCatogary= ()=>{
     localStorage.setItem('catogary',this.catogary)
     if(this.catogary.toLowerCase()=='All Products'.toLowerCase()){
      this.DiaplayAllProudcts()
     }else {
    this.productsService.getProducts(this.catogary).subscribe(res => {
       let productsRes:any = res
       this.displayProducts(productsRes,this.catogary)

    })
  }
  }

  displayProducts(productsRes:any,catogary:any){
    Object.keys(productsRes).map((x)=>{ //x: Hot,cold  25, 26 anything inside catogary
      let subCatogary=  Object.values(productsRes[x]).some( 
         (value:any) => { // check if there is sub catogory 
           return  value.name !== undefined
         })
         if(subCatogary==true){
          for(let key2 in productsRes[x] ){ // loop  the proudct inside subcatogary
           productsRes[x][key2]['id']=key2
           productsRes[x][key2]['catogary']=catogary+'/'+x
           this.products.push(productsRes[x][key2])

          }
           // this.categories.push(key+' '+x)
           // for(let index in )

         }else if(subCatogary == false){

          productsRes[x]['id']=x 
          productsRes[x]['catogary']= catogary

           this.products.push(productsRes[x]) // no need to loop add dirctly

         }
     })
  }

  searchBar(){
    // console.log(this.products)
    if(localStorage.getItem('search')==undefined){
      return true
    }else{
      // this.products.map((x:any, index:any)=>{
        
      //  if(!x.name.startsWith(localStorage.getItem('search'))){
      //   delete this.products[index]
      //  }    
      
      // })
       return localStorage.getItem('search')
      
    }

  }

  deleteProudct(id:any, catogary:any){

    this.productsService.deleteProduct(catogary+'/'+id).subscribe(res=>{


      try{
        alert('Deleted Succeffully')
        window.location.reload();        
      }catch(err){
        alert('error')
      }

    
      })


 
  }

}
