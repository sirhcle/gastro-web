import { Component, OnInit } from '@angular/core';
import { EdicionService } from 'src/app/services/perfil/edicion.service';
import { FormGroup, FormControl } from '@angular/forms';
import { stringify } from 'querystring';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  public usuarioactual;
  public updated;
  public validPass;
  usuarioForm: FormGroup;
  constructor(private _edicionService: EdicionService) {
    this.usuarioForm = new FormGroup({
      name: new FormControl(),
      username: new FormControl(),
      mail: new FormControl(),
      ubicacion: new FormControl(),
      detalle: new FormControl(),
      contraseña: new FormControl(),
      nueva: new FormControl(),
      confirmar: new FormControl()
    });
    this.updated = 1;
    this.validPass = true;
  }

  ngOnInit(): void {
    const locStorage = localStorage.getItem('userData');
    const userData = JSON.parse(locStorage);

    this._edicionService.getUsuario(userData.idUsuario).subscribe(
      response => { this.usuarioactual = response[0]; console.log(this.usuarioactual); },
      error => { console.log(error as any); }
    );
  }

  guardarDatos() {
    const locStorage = localStorage.getItem('userData');
    const userData = JSON.parse(locStorage);

    const idUsuario = userData.idUsuario; // this.usuarioactual.idUsuario;
    const nombre = this.usuarioForm.value.name;
    const usuario = this.usuarioForm.value.username;
    const correo = this.usuarioForm.value.mail;
    const ubicacion = this.usuarioForm.value.ubicacion;
    const acerca = this.usuarioForm.value.detalle;
    this._edicionService.updateUsuario(idUsuario, nombre, usuario, correo, ubicacion, acerca)
      .subscribe(response => {
        this.updated = response.status;
        console.log(response);
        if (this.updated === 0) {
          alert('datos actualizados');
        } else {
          alert('servicio no disponible por el momento');
        }
      },
        error => { console.log(error as any); });
  }

  cambiarContrasena() {
    const locStorage = localStorage.getItem('userData');
    const userData = JSON.parse(locStorage);

    const idUsuario = userData.idUsuario; // this.usuarioactual.idUsuario;
    const oldPassword = this.usuarioForm.value.contraseña;
    const password = this.usuarioForm.value.nueva;
    if (this.validPass) {
      this._edicionService.updatePassword(idUsuario, oldPassword, password)
        .subscribe(response => { 
          console.log(response);
          if (response.status === 0) {
            alert('Contraseña actualizada');
          } else {
            alert(response.error);
          }
        },
          error => { console.log(error as any); });
    }
  }

  validarContrasena() {
    if (this.usuarioForm.value.nueva === this.usuarioForm.value.confirmar) {
      this.validPass = true;
    }
    else { this.validPass = false; }
  }
}
