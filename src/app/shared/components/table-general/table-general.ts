import { AfterViewInit, Component, computed, effect, input, output, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TitleCasePipe } from '@angular/common';

type TableColumn = {
  field: string;
  title: string;
  icon?: string;
};

@Component({
  selector: 'app-tables',
  imports: [MatTableModule, MatPaginatorModule, MatIconModule, TitleCasePipe],
  templateUrl: './table-general.html',
  styleUrl: './table-general.sass',
})
export class TableGeneral implements AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  readonly columns = input.required<TableColumn[]>();
  readonly rows = input.required<any[]>();
  readonly displayedColumns = computed(() =>
    this.columns().map((column) => column.field)
  );
  // Evento que emite la fila seleccionada
  readonly rowSelected = output<any>();

  dataSource = new MatTableDataSource<any>([]);

  constructor() {
    effect(() => {
      console.log('displayedColumns', this.displayedColumns());
      console.log('rows', this.rows());
      this.dataSource.data = this.rows();
    });
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    if (this.paginator !== null) {
      this.paginator._intl.itemsPerPageLabel = 'Ítems por página';
    }
  }

  actionButton(element: string): void {
    console.log('info emitida:', element);
    this.rowSelected.emit(element);
  }
}
