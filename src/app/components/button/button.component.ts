import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { IButtonModel } from './button.model';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class ButtonComponent implements OnInit {
  @Input() config: IButtonModel;

  constructor() {}

  ngOnInit(): void {}

  public openModalForm() {
    console.log('abre el modal formulario');
  }
}
