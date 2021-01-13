import {
  Component,
  OnInit,
  ComponentFactoryResolver,
  Inject,
  AfterViewInit,
  ViewContainerRef,
  ViewChild,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-reusable-modal',
  templateUrl: './reusable-modal.component.html',
  styleUrls: ['./reusable-modal.component.less'],
})
export class ReusableModalComponent implements OnInit, AfterViewInit {
  public title: string;
  public confirmButton: string;
  public cancelButton: string;
  public component: boolean;
  public dataExample: any;
  private componentRef;
  @ViewChild('component', { read: ViewContainerRef, static: false })
  container: ViewContainerRef;

  constructor(
    private dialogRef: MatDialogRef<ReusableModalComponent>,
    private resolver: ComponentFactoryResolver,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.title = this.data.title ? this.data.title : '';
    if (this.data.component) {
      this.component = true;
      this.componentRef = this.resolver.resolveComponentFactory(
        this.data.component
      );
    }
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (this.data.component) {
      setTimeout(() => {
        this.container.createComponent(this.componentRef);
      }, 0);
    }
  }

  public cancelButtonClick() {
    this.dialogRef.close();
  }

  public confirmButtonClick() {
    this.dialogRef.close({ data: this.dataExample })
  }
}
