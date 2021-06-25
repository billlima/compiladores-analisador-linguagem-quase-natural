import { Component, OnInit } from '@angular/core';

declare const interpretar: any;

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    interpretar();


  }

}
