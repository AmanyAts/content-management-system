import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, NgForm, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';
import { FormGroup, FormControl, FormArray } from '@angular/forms'
import { conditionalValidator } from '../../services/formValidation/validation.service'
import { CategoriesComponent } from '../categories/categories.component'
import { Router } from '@angular/router';
@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  //the incoming data from product-details (in case edit)
  @Input() productName!: any
  @Input() productImage!: any
  @Input() productDec!: any
  @Input() productPrice!: any
  @Input() productOption!: any
  @Input() productId!: any
  @Input() productCatogary!: any
  catogary: any
  add = true

  url = '../../../assets/Images/upload-image.png'

  constructor(private product: ProductsService, private categoriesComponent: CategoriesComponent, private cdr: ChangeDetectorRef, private formBuilder: FormBuilder, private router: Router) { }

  //the group form 
  addingProduct: any = new FormGroup({
    productImage: new FormControl(''),
    productName: new FormControl('', Validators.required),
    description: new FormControl(''),
    //nested groups
    checkBox: new FormGroup({
      small: new FormControl(false),
      Meduim: new FormControl(false),
      Large: new FormControl(false),
      priceSmall: new FormControl('', [
        conditionalValidator(() => this.addingProduct.controls['checkBox'].controls['small'].value,
          Validators.required,
          'illuminatiError')]),
      priceMeduim: new FormControl('', [
        conditionalValidator(() => this.addingProduct.controls['checkBox'].controls['Meduim'].value,
          Validators.required,
          'illuminatiError')]),
      priceLarge: new FormControl('', [
        conditionalValidator(() => this.addingProduct.controls['checkBox'].controls['Large'].value,
          Validators.required,
          'illuminatiError')]),
    }),
    Additional: new FormGroup({})

  })

  sizePrice: any[] = [{ size: 'small', price: 'priceSmall' }, { size: 'Meduim', price: 'priceMeduim' }, { size: 'Large', price: 'priceLarge' }]


  selectedCatogary(eventData: { name: string }) {
    //this medthod to ge the value from catogary comp
    this.catogary = eventData.name
    return eventData.name
  }



  ngOnInit(): void {


    localStorage.setItem('image', '../../../assets/Images/upload-image.png')

    //initialize nested form for addational options
    this.addingProduct.controls['Additional'] = this.formBuilder.group({
      items: this.formBuilder.array([]), //this is holding arrary of items. Also, this itself a formGroup of many controls.

    })

    // at least one box is cheecked
    this.addingProduct.controls['checkBox'].valueChanges.subscribe((newValue: any) => {
      if (newValue.small === true || newValue.Meduim === true || newValue.Large === true) {
        for (let key in newValue) {
          if (newValue[key] === false) {
            this.addingProduct.controls['checkBox'].controls[key].setErrors(null)
          }
        }

      } else {
        this.addingProduct.setErrors({ required: true });

      }
    })
  }

  ngAfterViewInit(): void {

    // for update (exisiting product)
    let small = false
    let Meduim = false
    let large = false


    for (let key in this.productPrice) {
      if (this.productPrice[key] != '') {
        if (key.toLowerCase().startsWith("S".toLowerCase())) {
          this.productPrice['small'] = true
          this.productPrice['priceSmall'] = this.productPrice[key]

        } else if (key.toLowerCase().startsWith("M".toLowerCase())) {
          this.productPrice['Meduim'] = true
          this.productPrice['priceMeduim'] = this.productPrice[key]

        } else if (key.toLowerCase().startsWith("L".toLowerCase())) {
          this.productPrice['Large'] = true
          this.productPrice['priceLarge'] = this.productPrice[key]

        }
      }
    }

    this.addingProduct.patchValue({
      productName: this.productName,
      description: this.productDec,
      checkBox: this.productPrice,
      Additional: this.productOption

    });
    this.url = this.productImage
    this.cdr.detectChanges();

  }

  // price required for the selected size
  validatePriceInput(size: string, sizePrice: string) {
    this.addingProduct.controls['checkBox'].controls[size].valueChanges
      .subscribe(() => {
        this.addingProduct.controls['checkBox'].controls[sizePrice].updateValueAndValidity();
      });
  }

  bodyRequest = () => {
    //this method to create request body with 
    let productId
    if (this.productId != undefined) {
      // if prouct Id is exist it means edit request not new prodct
      productId = this.productId
      this.catogary = this.productCatogary


    } else {
      //new product
      productId = Math.random() * Date.now() | 0
      this.productImage = localStorage.getItem('image')
    }
    let checkBox = this.addingProduct.controls['checkBox'].value
    let addationalOptions = this.addingProduct.controls['Additional'].value
    let req: any = {}

    req[productId] = {
      "image": this.productImage,
      "name": this.addingProduct.controls['productName'].value,
      "description": this.addingProduct.controls['description'].value,
      "price": {
        "S": checkBox['priceSmall'],
        "M": checkBox['priceMeduim'],
        "L": checkBox['priceLarge']
      },
      'additionalOptions': this.getFormOptionsData()

    }

    return req
  }

  addProuct() {
    //once add button is clicked
    this.product.addProduct(this.bodyRequest(), this.catogary).subscribe()
    alert('Added successfully')
    this.router.navigate(['/'])
  }


  // the below methods for adding new input (addational options)
  createItem(): FormGroup {
    return new FormGroup({
      optionPrice: new FormControl(0), //default value of id is zero as it is new item to be added to server
      optionName: new FormControl('', Validators.required),
    });
  }

  get items(): FormArray {
    return <FormArray>this.addingProduct.controls['Additional'].get('items')
  }

  isformValid(): boolean {
    return this.addingProduct.controls['Additional'].valid && this.addingProduct.controls['Additional'].dirty;
  }
  validateField(item: any): boolean {
    return !item.valid && (item.dirty || item.touched);
  }

  addItem() {
    this.items.push(this.createItem())
    this.addingProduct.controls['Additional'].markAsDirty();
    this.items.markAsDirty()
  }

  getFormOptionsData() {
    const finalData = this.addingProduct.controls['Additional'].value.items
    return finalData
  }



}
