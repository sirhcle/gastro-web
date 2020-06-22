import { Component, OnInit } from '@angular/core';
import { DireccionesService } from 'src/app/services/perfil/direcciones.service';
import { FormsModule } from '@angular/forms';
import { Direcciones } from 'src/app/models/direcciones';

@Component({
  selector: 'app-misdirecciones',
  templateUrl: './misdirecciones.component.html',
  styleUrls: ['./misdirecciones.component.scss']
})
export class MisDireccionesComponent implements OnInit {
  public direccion: Direcciones;
  public registro;

  constructor(private _direccionesService: DireccionesService) {
    this.direccion = new Direcciones('',0,'','','',0);
   }

  ngOnInit(): void {
  }
agregar(){
 this._direccionesService.agregarDireccion(this.direccion.calle,
                    this.direccion.numero,
                    this.direccion.colonia,
                    this.direccion.ciudad,
                    this.direccion.estado,
                    this.direccion.cp, 1)
.subscribe(response => {this.registro = response.status;
                        console.log(this.registro);},
  error => {console.log(error as any); });
}
}
