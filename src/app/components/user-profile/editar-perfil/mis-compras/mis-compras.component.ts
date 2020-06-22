import { Component, OnInit } from '@angular/core';
import { FavoritosService } from 'src/app/services/perfil/favoritos.service';
import { NgForOf } from '@angular/common';
import { newArray } from '@angular/compiler/src/util';
import { Custom } from '@ngu/carousel/lib/ngu-carousel/ngu-carousel';

@Component({
  selector: 'app-mis-compras',
  templateUrl: './mis-compras.component.html',
  styleUrls: ['./mis-compras.component.scss']
})
export class MisComprasComponent implements OnInit {
public videos: Array<Custom>;
public video: Array<any>;
  constructor(private _favoritosService : FavoritosService) {
    this.video=newArray('' as any) ;
   }

  ngOnInit(): void {
    this._favoritosService.getFavoritos(1).subscribe(response => {
      this.videos = response.videos;
      for(let elemento of this.videos){
       for(let detalle of elemento){
         this.video.push(detalle);
       }
      }; },
error => {console.log(error as any); });
  }

}
