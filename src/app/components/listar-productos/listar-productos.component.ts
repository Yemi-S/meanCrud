import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-listar-producto',
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.css']
})
export class ListarProductosComponent implements OnInit {

  listaProductos: Producto[] = [];
  constructor(private productoSvc:ProductoService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos():void{
    this.productoSvc.getProductos().pipe(
      tap((productsList: Producto[])=>this.listaProductos = productsList)
    ).subscribe({
      error: (err)=>console.log(err)
    });
  }
  eliminarProducto(id: any):void{
    this.productoSvc.eliminarProducto(id).pipe(
      tap(()=>this.toastr.error('El producto fue eliminado con éxito', 'Producto eliminado'))
    ).subscribe({
      next: ()=>this.obtenerProductos(),
      error: (err)=>console.log(err)
    });
  }

}
