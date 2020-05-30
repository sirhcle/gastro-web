import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-carrusel-videos',
  templateUrl: './carrusel-videos.component.html',
  styleUrls: ['./carrusel-videos.component.scss']
})
export class CarruselVideosComponent implements OnInit {

  @Input() carouselID: string;


  


  constructor() { }

  ngOnInit(): void {}

}
