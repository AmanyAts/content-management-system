import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  constructor(private route : ActivatedRoute ,private product:ProductsService) { }
  productId:any
  productCatogary:any
  productName!:any
  productImage!:any
  productDec!:any
  productPrice!:any
  productOption!:any
  productLoaded: Promise<boolean> | undefined;


  ngOnInit(): void {


    this.route.queryParams.subscribe(params =>{
      this.productId=params['productId']
      this.productCatogary= params['productCatogary']

      this.product.getProducts(this.productCatogary+'/'+this.productId).subscribe((res:any)=>{
        // to get product info 
        this.productName=res.name
        this.productImage =res.image
        localStorage.setItem('image',res.image)

        this.productPrice =res.price
        this.productOption = res.additionalOptions
        this.productDec = res.description

        this.productLoaded = Promise.resolve(true);

      })
    })

    

  }

}
