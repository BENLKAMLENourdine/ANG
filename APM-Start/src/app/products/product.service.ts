import { Injectable } from "@angular/core";
import { IProduct } from "./product";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, catchError, tap, throwError } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    productsUrl = 'http://localhost:3000/products'
    constructor (private http: HttpClient) {

    }

    getProducts(): Observable<IProduct[]> {
        return this.http.get<IProduct[]>(this.productsUrl).
                pipe(tap(data => console.log('All: ', JSON.stringify(data))),
                catchError(this.handleError))
    }

    getProductById(productId: number): Observable<IProduct>{
        return this.http.get<IProduct>(`${this.productsUrl}/${productId}`).
                pipe(tap(data => console.log('Product with id: ', productId, data)),
                catchError(this.handleError))
    }

    handleError(err: HttpErrorResponse) {
        let errorMessage = ''

        if (err.error instanceof ErrorEvent) {
            errorMessage = `An error occured ${err.error.message}`
        } else {
            errorMessage = `Server returned ${err.status} error message is ${err.message}`
        }

        console.log(errorMessage)
        return throwError(() => errorMessage)
    }
}