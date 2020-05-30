import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  masonryItems = [
    { title: 'item 1' },
    { title: 'item 2' },
    { title: 'item 3' },
    { title: 'item 3' },
    { title: 'item 3' },
    { title: 'item 3' },
    { title: 'item 3' },
    { title: 'item 3' },
    { title: 'item 3' },
  ];
  constructor() { }

  ngOnInit(): void {
    // $('.grid').masonry({
    //   // options...
    //   itemSelector: '.grid-item',
    //   columnWidth: 200
    // });
  }

}
