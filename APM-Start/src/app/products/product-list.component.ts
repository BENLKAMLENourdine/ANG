import { Component, OnDestroy, OnInit } from "@angular/core";
import { IProduct } from "./product";
import { ProductService } from "./product.service";
import { Subscription } from "rxjs";

@Component({
    selector: 'apm-products',
    templateUrl: './produc-list.component.html',
    styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, OnDestroy {
    pageTitle: string = 'Product list'
    width = 50
    margin = 2
    showImage: boolean = true
    _listFilter: string = ''
    sub!: Subscription;

    onRatingClick(event: string) {
      this.pageTitle = 'Product List ' + event
    }

    get listFilter(): string {
        return this._listFilter
    }

    set listFilter(listFilter: string) {
        this._listFilter = listFilter
        console.log('In setter: ', this._listFilter)
        this.performFilter()
    }
    errorMessage = ''
    filteredProducts: IProduct[] = []
    products: IProduct[] = []

    constructor(private productService: ProductService) {
    }

    performFilter(): void {
        this.filteredProducts = this.products.filter(product => product.productName.toLowerCase().includes(this.listFilter.toLowerCase()))
    }

    toggleImage (): void {
        this.showImage = !this.showImage
    }

    ngOnInit(): void {
        console.log('ng on init')
        this.sub = this.productService.getProducts().subscribe({
          next: products => {
            this.products = products
            this.filteredProducts = this.products
          },
          error: err => this.errorMessage = err
        })        
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe()
    }
}