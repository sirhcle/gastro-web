import { Component, OnInit } from '@angular/core';
import { EdicionService } from 'src/app/services/perfil/edicion.service';
import { FormGroup, FormControl } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  profileImg: File = null;
  isFile: boolean;
  public fotoPerfil: string;

  public usuarioactual;
  public updated;
  public validPass;
  usuarioForm: FormGroup;
  cambiar: boolean;
  constructor(private spinner: NgxSpinnerService, private _edicionService: EdicionService) {
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
    this.cambiar = false;
  }

  ngOnInit(): void {
    this.spinner.show();
    const locStorage = localStorage.getItem('userData');
    const userData = JSON.parse(locStorage);
   // this.usuarioactual = userData;
    this._edicionService.getUsuario(userData.idUsuario).subscribe(response => {
      this.usuarioactual = response[0];
      console.log(this.usuarioactual);

      this.usuarioForm.patchValue({name: this.usuarioactual.nombre_usuario,
        username: this.usuarioactual.usuario_usuario,
        mail: this.usuarioactual.correo_usuario,
        ubicacion: this.usuarioactual.ubicacion_usuario,
      detalle: this.usuarioactual.acerca_usuario});

      this.spinner.hide();
      if (!this.usuarioactual.foto_usuario){
        this.fotoPerfil = '/assets/imgs/iconUser.png';
      }
      else{
        this.fotoPerfil = this.usuarioactual.foto_usuario;
      }
     },
      error => { console.log(error as any);
                 this.spinner.hide(); }
    );

    this.isFile = true;
  }

  guardarDatos() {

    const idUsuario = this.usuarioactual.id_usuario;
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
         // alert('datos actualizados');
        } else {
          alert('servicio no disponible por el momento');
        }
      },
        error => { console.log(error as any); });
  }

  cambiarContrasena() {
    const idUsuario = this.usuarioactual.id_usuario;
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

  cambio(files: FileList) {
    this.profileImg = files.item(0);
    this.isFile = !this.profileImg;
    const retVal = confirm('La imagen de perfil será cambiada por ' + this.profileImg.name);
    if (retVal){
      this.subirImg();
      this.cambiar = !this.cambiar;
    }
    else{
      this.cambiar = !this.cambiar;
    }
}
subirImg(){
  this._edicionService.updateImg(this.usuarioactual.id_usuario, this.profileImg)
  .subscribe(response => {
    console.log(response);
});
}

}
