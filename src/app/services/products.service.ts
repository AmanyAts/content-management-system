import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from './APIsUrls';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }
  //roorURL = URL_HERE


 // rootURL = API.rootURL; // url here 

  getProducts(catogary:any) {
    if(catogary.toLowerCase() =='All Products'.toLowerCase()){
      console.log('dddd')
      console.log(catogary)
      return this.http.get(this.rootURL + '/Product.json');


    }else{
      return this.http.get(this.rootURL + '/Product/'+catogary+'.json');

    }
  }

  addProduct( request:any ,category: any) {
    console.log('service')
 
    return this.http.patch(this.rootURL + '/Product/' + category + '.json',  request );
  }

  deleteProduct(category: any){
    console.log(this.rootURL+ '/Product/' + category + '.json')
    return this.http.delete(this.rootURL+ '/Product/' + category + '.json')
  }

}
