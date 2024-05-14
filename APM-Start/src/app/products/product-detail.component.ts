import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from './product';
import { ProductService } from './product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'apm-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute, private router: Router, private productService: ProductService) { }
  pageTitle: string = "Product detail "
  productId: number = 0
  product: IProduct | undefined
  sub!: Subscription

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id'))
    this.sub = this.productService.getProductById(this.productId).subscribe({
      next: data => this.product = data
    })
  }

  ngOnDestroy(): void {
      this.sub.unsubscribe()
  }

  onBack(): void {
    this.router.navigate(['/products'])
  }

}
