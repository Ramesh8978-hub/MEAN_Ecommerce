import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private products: Product[] = [];
  private product: Product | any;
  private products$ = new Subject<Product[]>();
  private headers = new HttpHeaders().set('Content-Type', 'application/json');
  readonly url = "http://localhost:3000/api";

  constructor(private http: HttpClient) { }

  getProducts() {
    this.http
      .get<{ products: Product[] }>(this.url + "/getProduct")
      .pipe(
        map((productData) => {
          return productData.products;
        })
      )
      .subscribe((products) => {
        this.products = products;
        this.products$.next(this.products);
      });
  }

  getProductsStream() {
    return this.products$.asObservable();
  }

  addProduct(name: string, description: string,qty:string, price: string, image: File): void {
    const productData = new FormData();
    productData.append("name", name);
    productData.append("description", description);
    productData.append("qty", qty);
    productData.append("price", price);
    productData.append("image", image, name);
    this.http
      .post<{ product: Product }>(this.url + "/addProduct", productData)
      .subscribe((productData) => {
        const product: Product = {
          _id: productData.product._id,
          name: name,
          description: description,
          qty: qty,
          price: price,
          imagePath: productData.product.imagePath,
        };
        this.products.push(product);
        this.products$.next(this.products);
      });
  }
 

  deleteProduct(id: string) {
    return this.http.delete(this.url + '/deleteProduct/' + id, { headers: this.headers })
  }
  updateProduct(id: string,product: any) {
    return this.http.put(this.url + '/updateProduct/'+ id, product, { headers: this.headers })
  }
  editProduct(id:string){
    return this.http.get(this.url + '/editProduct/' + id, { headers: this.headers })
  }

  


  setter(product: Product) {
    this.product = product
  }
  getter() {
    return this.product
  }

}
