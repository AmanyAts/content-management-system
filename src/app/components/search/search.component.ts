import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
// import {ProductsComponent} from '../products/products.component'
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements AfterViewInit {

  constructor() { }
  searchBar =new FormControl('')

  searchForProduct(event:any){
    console.log(this.searchBar.value)
    localStorage.setItem('search',String(this.searchBar.value))
    // this.productsComponent.searchBar(event.value)
  }
  ngAfterViewInit (): void {
    console.log( localStorage.getItem('products'))
    // localStorage.getItem('products')
  }

}
