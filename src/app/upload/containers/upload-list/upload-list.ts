import { Component, effect, inject, OnInit, signal } from '@angular/core';

import {AsyncPipe, DatePipe, JsonPipe} from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ActivatedRoute, Router, RouterLink, RouterOutlet} from '@angular/router';
import { UploadStatusComponent } from '../../components/upload-status/upload-status';
import {UploadService} from "../../services/upload.service";
import {AppUploadDataItem, Upload, UploadDataItem, UploadStatus} from "../../models/upload.model";
import {AuthService} from "../../../auth/services/auth.service";
import {uploadData} from "aws-amplify/storage";
import {AmplifyAuthenticatorModule} from "@aws-amplify/ui-angular";
import {Schema} from "../../../../../amplify/data/resource";
import {DropzoneDirective} from "../../directives/dropzone.directive";
import {Dialog} from "@angular/cdk/dialog";
import {UploadDialog} from "../upload-dialog/upload-dialog";
import {CdkMenu, CdkMenuItem, CdkMenuTrigger} from "@angular/cdk/menu";

@Component({
  selector: 'app-upload-list',
  imports: [
    DatePipe,
    ReactiveFormsModule,
    FormsModule,
    RouterLink,
    UploadStatusComponent,
    AsyncPipe,
    JsonPipe,
    AmplifyAuthenticatorModule,
    RouterOutlet,
    DropzoneDirective,
    CdkMenu,
    CdkMenuItem,
    CdkMenuTrigger,
  ],
  templateUrl: './upload-list.html',
  standalone: true
})
export class UploadList implements OnInit {
  private authService = inject(AuthService);
  protected uploadService = inject(UploadService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  protected readonly UploadStatus = UploadStatus;

  uploads = this.activatedRoute.snapshot.data['uploads'];
  list = signal<Upload[]>([]); // = this.uploadService.getAll();//.appUploadDataItems;//.getAll(); //: readonly AppUploadDataItem[] = [];
  filteredData: Upload[] = [];
  sortedData: Upload[] = [];

  // filteredData = signal<AppUploadDataItem[]>([]);

  allChecked = false;
  indeterminate = false;

  nameSearchValue = '';
  nameSearchVisible = false;

  filter: any = {};
  sort = signal<{field: keyof Upload, order: 'asc' | 'desc'}>({field: 'createdAt', order: 'desc'});
  pagination= signal<{pageIndex: number; pageSize: number; totalPages: number;}>({pageIndex: 0, pageSize: 5, totalPages: 0});
  // protected totalPages = signal(1);
  // protected currentPage = signal<number>(1);

  async ngOnInit(): Promise<void> {
    // await this.refresh();
  }

  async refresh() {
    const result = await this.uploadService.getWithQuery();
    this.filteredData = this.applyFilter(result.data);
    this.sortedData = this.applySorting(this.filteredData);
    const paginatedData = this.applyPagination(this.sortedData);
    this.list.set(paginatedData);
  }

  private applyFilter(data: Upload[]): Upload[] {
    return data.filter(d => d.name?.toLowerCase().includes(this.nameSearchValue.toLowerCase()));
  }

  private applySorting(data: Upload[]): Upload[] {
    const {field, order} = this.sort();
    return data.sort((a, b) => {
      const aValue = `${a[field] ?? ''}`;
      const bValue = `${b[field] ?? ''}`;
      if (field === 'name') {
        return order === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      }

      if (aValue === bValue) {
        return 0;
      }

      if (order === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }

  private applyPagination(data: Upload[]): Upload[] {
    const {pageIndex, pageSize} = this.pagination();
    this.pagination.set({...this.pagination(), totalPages: Math.ceil(data.length / pageSize)});
    return data.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);
  }

  protected async deleteItem(item: any) {
    // this.dialog.open<string>(DeleteDialog,
    //   {
    //     data: {
    //       files: this.files,
    //     },
    //     hasBackdrop: false,
    //     disableClose: true,
    //   });
    await this.uploadService.delete(item);
    await this.refresh();
  }

  // getItem() {
  // }
  //
  // protected openSingleUpload(data: AppUploadDataItem) {
  //   if (
  //     data.status() === UploadStatus.Valid ||
  //     data.status() === UploadStatus.InvalidWithErrorWarning ||
  //     data.status() === UploadStatus.WarningsResolved
  //   ) {
  //     this.router.navigate(['/uploads', data.id]).then();
  //   }
  // }



  // Selection
  // onSelectAll(): void {
  //   const value = !this.allChecked;
  //   this.list().forEach((data) => {
  //     data.checked = value;
  //   });
  //   this.refreshStatus();
  // }
  //
  // refreshStatus(): void {
  //   const allChecked = this.list().length > 0 && this.list().every((value) => value.checked);
  //   const allUnChecked = this.list().every((value) => !value.checked);
  //   this.allChecked = allChecked;
  //   this.indeterminate = !allChecked && !allUnChecked;
  // }
  //
  // protected onSelect(item: Upload) {
  //   item.checked = !item.checked;
  //   this.refreshStatus();
  // }
  //
  // // Pagination
  // onCurrentPageDataChange(listOfCurrentPageData: readonly AppUploadDataItem[]): void {
  //   this.filteredData.set(listOfCurrentPageData as AppUploadDataItem[]);
  //   this.refreshStatus();
  // }

  // Sort
  // protected nameSortFn = (a: AppUploadDataItem, b: AppUploadDataItem) =>
  //   a.name.localeCompare(b.name);
  // protected idSortFn = (a: AppUploadDataItem, b: AppUploadDataItem) => a.id - b.id;

  // Filter
  // protected statusFilter = [
  //   { text: 'Invalid with Error or Warning', value: UploadStatus.InvalidWithErrorWarning },
  //   { text: 'Warnings Resolved', value: UploadStatus.WarningsResolved },
  //   { text: 'Valid', value: UploadStatus.Valid },
  //   { text: 'Failed Upload', value: UploadStatus.FailedUpload },
  //   { text: 'Failed Validation', value: UploadStatus.FailedValidation },
  //   { text: 'Uploading', value: UploadStatus.Uploading },
  //   { text: 'Validating', value: UploadStatus.Validating },
  // ];
  // protected statusFilterFn = (status: string | string[], item: AppUploadDataItem) => {
  //   if (Array.isArray(status)) {
  //     return status.some((s) => item.status().toString().indexOf(s) !== -1);
  //   }
  //   return item.status().toString().indexOf(status) !== -1;
  // };
  //
  // resetNameSearch(): void {
  //   this.nameSearchValue = '';
  //   this.searchName();
  // }

  // searchName(): void {
  //   // this.nameSearchVisible = false;
  //   // this.filteredData.set(this.listOfData.filter(
  //   //   (item: AppUploadDataItem) => item.name.indexOf(this.nameSearchValue) !== -1,
  //   // ));
  // }

  // onFileSelected(event: any) {
  //
  //   const file:File = event.target.files[0];
  //
  //   if (file) {
  //
  //     this.fileName = file.name;
  //
  //     const formData = new FormData();
  //
  //     formData.append("thumbnail", file);
  //
  //     const upload$ = this.http.post("/api/thumbnail-upload", formData);
  //
  //     upload$.subscribe();
  //   }
  // }

  fileName = '';

  // async onFileSelected(event: any) {
  //   // const file:File = event.target.files[0];
  //   //
  //   // // update db
  //   // await this.uploadService.add({
  //   //   name: file.name, //`File-${Date.now()}`,
  //   //   status: 'uploading',//'pending',//UploadStatus.Pending,
  //   //   // uploadProgress: 0,
  //   //   // validationProgress: 0,
  //   //   // validatedAt: undefined,
  //   //   // checked: false,
  //   //   // id: 0,
  //   //   // releaseVersion: undefined,
  //   //   sha: file.size,
  //   //   type: file.type,//"txt",
  //   //   // uploadedAt: "",
  //   //   uploadedBy: this.authService.user()?.username,
  //   //   // viewed: undefined,
  //   //
  //   // });
  //   // // uploadFile
  //   // await this.uploadService.uploadFile(file);
  //   // // show progress
  // }
  //
  // async addItem() {
  //   // console.log('Class: UploadList, Function: addItem, Line 93 ' , );
  //   // await this.uploadService.add({
  //   //   name: `File-${Date.now()}`,
  //   //   status: 'pending',//UploadStatus.Pending,
  //   //   // uploadProgress: 0,
  //   //   // validationProgress: 0,
  //   //   // validatedAt: undefined,
  //   //   // checked: false,
  //   //   // id: 0,
  //   //   // releaseVersion: undefined,
  //   //   sha: "",
  //   //   type: "txt",
  //   //   // uploadedAt: "",
  //   //   uploadedBy: this.authService.user()?.username,
  //   //   // viewed: undefined,
  //   //
  //   // });
  // }


  isHovering: boolean = false;
  files: File[] = [];

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  onDrop(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      console.log('uploadManager adding file: ', files.item(i));
      const f = files.item(i);
      if (f) {
        this.files.push(f);
      }
    }
    this.openDialog();
  }

  dialog = inject(Dialog);

  openDialog(): void {
    this.dialog.open<string>(UploadDialog,
      {
        data: {
          files: this.files,
        },
        hasBackdrop: false,
        disableClose: true,
      });
  }

  protected onPreviousPage() {
    const {pageIndex} = this.pagination();
    this.pagination.set({...this.pagination(), pageIndex: Math.max(pageIndex - 1, 1)});
    const paginatedData = this.applyPagination(this.sortedData);
    this.list.set(paginatedData);
  }

  protected onNextPage() {
    const {pageIndex, totalPages} = this.pagination();
    this.pagination.set({...this.pagination(), pageIndex: Math.min(pageIndex + 1, totalPages)});
    const paginatedData = this.applyPagination(this.sortedData);
    this.list.set(paginatedData);
  }

  protected onSort(field: string, order: "asc" | "desc") {
    this.sort.set({field: field as keyof Upload, order});
    this.sortedData = this.applySorting(this.filteredData);
    const paginatedData = this.applyPagination(this.sortedData);
    this.list.set(paginatedData);
  }


}
