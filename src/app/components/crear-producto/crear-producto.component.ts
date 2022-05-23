import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {
  productoForm: FormGroup;
  constructor(private fb: FormBuilder,
              private router: Router, 
              private toastr: ToastrService,
              private productoSvc: ProductoService) { 
    this.productoForm = this.fb.group({
      producto: ['', Validators.required],
      categoria: ['', Validators.required],
      ubicacion: ['', Validators.required],
      precio: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  agregarProducto(){
    console.log(this.productoForm);
    const productoData: Producto = {
      nombre: this.productoForm.get('producto')?.value,
      categoria: this.productoForm.get('categoria')?.value,
      ubicacion: this.productoForm.get('ubicacion')?.value,
      precio: this.productoForm.get('precio')?.value,
    }

    this.productoSvc.guardarProducto(productoData).pipe(
      tap(()=>this.toastr.success('El producto fue registrado con éxito!','Producto Registrado')),
      tap(()=>this.router.navigate(['/'])),
    ).subscribe({
      error : (error)=>console.log(error)  
    });
  }
}
