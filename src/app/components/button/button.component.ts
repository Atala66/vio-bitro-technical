import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.less']
})
export class ButtonComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {  }




  public openModalForm() {
	  console.log('abre el modal formulario');
  }

}