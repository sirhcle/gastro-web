import { Component, ViewChild, ElementRef } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { NgIf } from '@angular/common';
import { MAT_DRAWER_CONTAINER, MatDrawer } from '@angular/material/sidenav/drawer';
import { NgSelectOption } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})

export class SideNavComponent{

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver) {}
  @ViewChild('drawer') divView: ElementRef;
  togglemenu(){
    this.divView.nativeElement.toggle();
  }
}

