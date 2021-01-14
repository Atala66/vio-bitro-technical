import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ReusableModalComponent } from './components/reusable-modal/reusable-modal.component';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

@NgModule({
  imports: [
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule,
  ],
  exports: [
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule,
  ],
})
export class MaterialModule {
  constructor(public dialog: MatDialog) {}

  /**
   * Abre el modal
   * @param data datos a pasar al modal
   */

  // tslint:disable-next-line:typedef
  public openModal(data?: any, content?: any) {
    if (!data) {
      data = {};
    }

    if (!data.class) {
      if (typeof content === 'string') {
        data.class = 'modalLg';
      } else {
        data.class = 'modal';
      }
    }

    if (data.class.indexOf('modal') === -1) {
      if (typeof content === 'string') {
        data.class = data.class + ' modalLg';
      } else {
        data.class = data.class + ' modal';
      }
    }
    data.class = data.class.split(' ');
    data.component = content;
    const dialogRef = this.dialog.open(ReusableModalComponent, {
	  // tslint:disable-next-line:object-literal-shorthand
      data: data,
      panelClass: data.class ? data.class : '',
    });

  }
}
