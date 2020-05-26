import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cursos-gratis',
  templateUrl: './cursos-gratis.component.html',
  styleUrls: ['./cursos-gratis.component.scss']
})
export class CursosGratisComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  openSuscripcion() {
    this.router.navigate(['/suscripcion']);
  }

}
