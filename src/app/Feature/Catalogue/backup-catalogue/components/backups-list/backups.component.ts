import { Component } from '@angular/core';
import { BackupListPage, BackupsItem } from '../../interface/backups.interface';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatTableModule } from '@angular/material/table';
import { BackupConstant } from '../../const/backup.constant';

@Component({
  selector: 'app-backups',
  standalone: true,
  imports: [MatTableModule, NgxPaginationModule, FormsModule],
  templateUrl: './backups.component.html',
  styleUrl: './backups.component.scss',
  providers: [BackupConstant]
})
export class BackupsComponent {

  rows: BackupsItem[] = [];
  dropDownSelectedValue: string = '10';
  page = new BackupListPage;
  columns: string[] = [];
  pageItem: string[] = ['10', '15', '20', '50', '100', 'All']

  constructor(public constant: BackupConstant) {
    this.columns = this.constant.columns
  }


  // Below function is use to set new page after page change
  RecordPerPage(): void {
    this.page.pageNumber = 1;
    if (this.dropDownSelectedValue != this.page.itemPerPage?.toString()) {
      if (this.dropDownSelectedValue == 'All') {
        this.page.itemPerPage = this.rows.length
      } else {
        this.page.itemPerPage = parseInt(this.dropDownSelectedValue)
      }
    }
  }

  // below function is use to serer side pagination
  changePage(pageNumber: number): void {
    if (pageNumber) {
      this.page.pageNumber = pageNumber;
    }
  }

}
