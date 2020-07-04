import { Component, OnInit, AfterViewInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ProximamenteComponent } from '../../modals/proximamente/proximamente.component';


declare var $: any;

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit, AfterViewInit {

  public modalRef: BsModalRef;

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
  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {
    // $('.grid').masonry({
    //   // options...
    //   itemSelector: '.grid-item',
    //   columnWidth: 200
    // });
  }

  ngAfterViewInit(): void {
    // this.modalRef = this.modalService.show(ProximamenteComponent);
  }
}
