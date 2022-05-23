import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  titulo: string = 'CREAR PRODUCTO';
  id: string | null;

  constructor(private fb: FormBuilder,
              private router: Router, 
              private toastr: ToastrService,
              private productoSvc: ProductoService,
              private aRouter: ActivatedRoute) { 
    this.productoForm = this.fb.group({
      producto: ['', Validators.required],
      categoria: ['', Validators.required],
      ubicacion: ['', Validators.required],
      precio: ['', Validators.required],
    });
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.esEditar();
  }

  agregarProducto(){
    console.log(this.productoForm);
    const productoData: Producto = {
      nombre: this.productoForm.get('producto')?.value,
      categoria: this.productoForm.get('categoria')?.value,
      ubicacion: this.productoForm.get('ubicacion')?.value,
      precio: this.productoForm.get('precio')?.value,
    }

    if (this.id !== null){
      this.productoSvc.editarProducto(this.id, productoData).pipe(
        tap(()=>this.toastr.info('El producto fue actualizado con éxito!','Producto Actualizado')),
        tap(()=>this.router.navigate(['/'])),
      ).subscribe({
        error : (error)=>console.log(error)  
      });
    } else {
      this.productoSvc.guardarProducto(productoData).pipe(
        tap(()=>this.toastr.success('El producto fue registrado con éxito!','Producto Registrado')),
        tap(()=>this.router.navigate(['/'])),
      ).subscribe({
        error : (error)=>console.log(error)  
      });
    }
  }

  esEditar(): void{
    if (this.id !== null){
      this.titulo = "EDITAR PRODUCTO";
      this.productoSvc.obtenerProducto(this.id).pipe(
        tap((data)=> this.productoForm.setValue({
          producto: data.nombre,
          categoria: data.categoria,
          ubicacion: data.ubicacion,
          precio: data.precio
        }))
      ).subscribe();
    }
  }
}
