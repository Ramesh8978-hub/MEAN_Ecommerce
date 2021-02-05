import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/shared/products.service';

@Component({
  selector: 'app-products-edit',
  templateUrl: './products-edit.component.html',
  styleUrls: ['./products-edit.component.css']
})
export class ProductsEditComponent implements OnInit {
product:Product |any
  constructor(private productService:ProductsService,private router:Router) { }

  ngOnInit(): void {
this.product = this.productService.getter();
  }
  updateProduct(form:NgForm){
    this.productService.updateProduct(this.product._id,form.value).subscribe((data)=>{
      console.log(data);
      
    })
    // this.router.navigate(['/products'])
  }
}
