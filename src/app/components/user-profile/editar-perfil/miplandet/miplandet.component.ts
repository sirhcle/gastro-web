import { SuscripcionService } from 'src/app/services/suscripcion/suscripcion.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-miplandet',
  templateUrl: './miplandet.component.html',
  styleUrls: ['./miplandet.component.scss']
})
export class MiPlanDetComponent implements OnInit {

  descripcionSuscripcion = '';
  nombreSuscripcion = '';
  precioSuscripcion = '';

  constructor(private _service: SuscripcionService, private router: Router) { }

  ngOnInit(): void {
    const locStorage = localStorage.getItem('userData');
    const userData = JSON.parse(locStorage);
    this._service.getSuscripcion(userData.idUsuario)
        .subscribe((resp: any) => {
          console.log(resp.suscription);
          this.descripcionSuscripcion = resp.suscription.descripcion_tipoSuscripciones;
          this.nombreSuscripcion = resp.suscription.nombre_tipoSuscripciones;
          this.precioSuscripcion = resp.suscription.precio_tipoSuscripciones;
        });
  }

  openSuscripciones() {
    this.router.navigate(['/suscripcion']);
  }

  cancelaSuscripcion() {
    const locStorage = localStorage.getItem('userData');
    const userData = JSON.parse(locStorage);
    this._service.getCancelarSuscripcion(userData.idUsuario)
        .subscribe((resp: any) => {
          console.log(resp);
          if (resp.status === 0) {
            alert('suscripcion cancelada');
            this.descripcionSuscripcion = '';
            this.nombreSuscripcion = '';
            this.precioSuscripcion = '';
          } else {
            alert(resp.error);
          }
        });
  }

}
