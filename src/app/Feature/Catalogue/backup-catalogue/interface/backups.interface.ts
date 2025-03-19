export class BackupListPage {
    itemPerPage: number = 10;
    totalItems: number = 0
    pageNumber: number = 1;
}

export interface BackupsItem {
    srNo: number;
    name: string;
    backupOn: boolean;
    user: string;
}