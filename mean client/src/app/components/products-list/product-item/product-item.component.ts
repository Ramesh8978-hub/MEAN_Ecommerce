import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/shared/products.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  form: FormGroup | any
  product: Product | any
  imageData: string | any

  constructor(
    private productService: ProductsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      _id:new FormControl(null),
      name: new FormControl(null),
      image: new FormControl(null),
      qty: new FormControl(1),
      description: new FormControl(null),
      price: new FormControl(null),
    });

  }
  onFileSelect(event: any) {
    const file = event.target.files[0]
    this.form.patchValue({ image: file });
    const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (file && allowedMimeTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageData = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }


  onSubmit() {
    this.productService.addProduct(this.form.value.name, this.form.value.description,this.form.value.qty, this.form.value.price, this.form.value.image);
    this.form.reset();
    this.imageData = null;
    this.router.navigate(['/products'])
  }

}


