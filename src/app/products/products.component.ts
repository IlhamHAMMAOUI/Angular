import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {async, Observable} from "rxjs";
import {NgClass} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {AppStateService} from "../services/app-state.service";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    NgClass,
    FormsModule
  ],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{

  constructor(private productService: ProductService,
              private router : Router, public appState :AppStateService) {
  }
  ngOnInit(){
    this.searchProducts();
  }
  searchProducts(){
    this.appState.setProductState({
      status :"LOADING"
    });
    this.productService.searchProducts(
    this.appState.productsState.keyword,
    this.appState.productsState.currentPage,
    this.appState.productsState.pageSize)
      .subscribe({
        next : (resp) => {
          //this.appState.productsState.products=resp.body as Product[];
          let products= resp.body as Product[];
          let totalProducts:number=parseInt(resp.headers.get('x-total-count')!);
          //this.appState.productsState.totalProducts= totalProducts;
          let totalPages =
          Math.floor(totalProducts / this.appState.productsState.pageSize);
          //console.log(this.appState.productsState.totalPages);
          if(totalProducts % this.appState.productsState.pageSize !=0){
            //this.appState.productsState.totalPages=this.appState.productsState.totalPages+1;
            ++totalPages;
          }
          this.appState.setProductState({
            products :products,
            totalProducts: totalProducts,
            totalPages: totalPages,
            status :"LOADED"
          })
        },
        error: err =>{
          this.appState.setProductState({
            status :"ERROR",
            errorMessage: err
          })
          //console.log(err);
        }
      })
    //this.products$ = this.productService.getProducts();
  }

  handleCheckProduct(product: Product) {
    this.productService.checkProduct(product)
      .subscribe({
      next :updatedProduct => {
        product.checked=!product.checked;
      }
    })
  }


  handleDelete(product: Product) {
    if(confirm("Etes vous sure?"))
    this.productService.deleteProduct(product).subscribe({
      next:value => {
        //this.getProducts();
        //this.appState.productsState.products=this.appState.productsState.products.filter((p:any)=>p.id!=product.id);
        this.searchProducts();
      }
    })
  }



  handleGotoPage(page: number) {
    this.appState.productsState.currentPage=page;
    this.searchProducts();

  }

  //protected readonly getSelection = getSelection;
  handleEdit(product: Product) {
    this.router.navigateByUrl(`/editProduct/${product.id}`)
  }
}
