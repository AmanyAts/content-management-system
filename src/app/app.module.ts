import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';  

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { ProductsComponent } from './components/products/products.component';
import { HttpClientModule } from '@angular/common/http';
import { CategoriesComponent } from './components/categories/categories.component';
import { LayoutComponent } from './components/layout/layout.component';
import { HomeComponent } from './components/home/home.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { NewProductComponent } from './components/new-product/new-product.component';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideAnalytics,getAnalytics,ScreenTrackingService,UserTrackingService } from '@angular/fire/analytics';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { UploadFileComponent } from './components/upload-file/upload-file.component';
import { SearchComponent } from './components/search/search.component';
import { FiliterPipe } from './components/filiter.pipe';



@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    CategoriesComponent,
    LayoutComponent,
    HomeComponent,
    ProductDetailsComponent,
    NewProductComponent,
    UploadFileComponent,
    SearchComponent,
    FiliterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAnalytics(() => getAnalytics()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
     AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireStorageModule
  ],

  providers: [CategoriesComponent, ScreenTrackingService, SearchComponent],
  //providers: [CategoriesComponent, ScreenTrackingService, UserTrackingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
