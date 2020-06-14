import { Component, OnInit } from '@angular/core';
import {Acquisition} from '../../models/acquisition';
import { AcquisitionService } from '../../services/acquisition.service';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { NgForm } from '@angular/forms';

declare var M: any;

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [AcquisitionService]
})
export class CreateComponent implements OnInit {


  public acquisition: Acquisition;
  public files: NgxFileDropEntry[] = [];
  constructor(
    private _acquisitionService: AcquisitionService
  ) {

      this.acquisition = new Acquisition('','','','','','','','');


   }
  ngOnInit(): void {
    this.getAcquisitions();
  }
  addAcquisition(form?: NgForm) {
    console.log(form.value);
    if(form.value._id) {
      this._acquisitionService.putAcquisition(form.value)
        .subscribe(res => {
          this.resetForm(form);
          this.getAcquisitions();
          M.toast({html: 'Updated Successfully'});
        });
    } else {
      this._acquisitionService.postAcquisition(form.value)
      .subscribe(res => {
        this.getAcquisitions();
        this.resetForm(form);
        M.toast({html: 'Save successfully'});
      });
    }

  }

  getAcquisitions() {
    this._acquisitionService.getAcquisitions()
      .subscribe(res => {
        this._acquisitionService.acquisitions = res as Acquisition[];
      });
  }

  editAcquisition(acquisition: Acquisition) {
    this._acquisitionService.selectedAcquisition = acquisition;
  }

  deleteAcquisition(_id: string, form: NgForm) {
    if(confirm('Are you sure you want to delete it?')) {
      this._acquisitionService.deleteAcquisition(_id)
        .subscribe(res => {
          this.getAcquisitions();
          this.resetForm(form);
          M.toast({html: 'Deleted Succesfully'});
        });
    }
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this._acquisitionService.selectedAcquisition = new Acquisition('','','','','','','','');
    }
  }
  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {

          // Here you can access the real file
          console.log(droppedFile.relativePath, file);

          /**
          // You could upload it like this:
          const formData = new FormData()
          formData.append('logo', file, relativePath)

          // Headers
          const headers = new HttpHeaders({
            'security-token': 'mytoken'
          })

          this.http.post('https://mybackend.com/api/upload/sanitize-and-save-logo', formData, { headers: headers, responseType: 'blob' })
          .subscribe(data => {
            // Sanitized logo returned from backend
          })
          **/

        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  public fileOver(event){
    console.log(event);
  }

  public fileLeave(event){
    console.log(event);
  }

}
