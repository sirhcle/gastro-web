import { Component, ViewChild, ElementRef } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { NgIf } from '@angular/common';
import { MAT_DRAWER_CONTAINER, MatDrawer } from '@angular/material/sidenav/drawer';
import { NgSelectOption } from '@angular/forms';
import { MatSidenav, matDrawerAnimations } from '@angular/material/sidenav';
import { async } from '@angular/core/testing';
import {MenuItemComponent} from './MenuItem';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})

export class SideNavComponent{
isMobile: boolean;
menuItems: Array<MenuItemComponent>;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver) {
    this.isMobile = true;
    this.menuItems = [
      new MenuItemComponent('perfil', '/assets/imgs/iconUser.png', 'Editar Perfil'),
      new MenuItemComponent('miscompras', '/assets/imgs/icoCompras.png', 'Mis Favoritos'),
      new MenuItemComponent('miplandet', '/assets/imgs/icoPlan.png', 'Mi Plan'),
      new MenuItemComponent('mispagos', '/assets/imgs/icoPago.png', 'Método de Pago'),
      new MenuItemComponent('misdirecciones', '/assets/imgs/icoDirecciones.png', 'Mis Direcciones')
    ];
  }
  _mobile(visible: boolean){
    this.isMobile = visible;
  }

  toggleMenu(menu){
    if (!this.isMobile){
      menu.toggle();
      this.isMobile = true;
    }
    else{
      this.isMobile = true;
    }
  }
}

