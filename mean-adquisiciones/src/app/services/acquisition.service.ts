import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Acquisition } from '../models/acquisition';

@Injectable({
  providedIn: 'root'
})
export class AcquisitionService {

  selectedAcquisition: Acquisition;
  acquisitions: Acquisition[];

  readonly URL_API = 'http://localhost:3000/acquisition';

  constructor(private http: HttpClient) {
    this.selectedAcquisition = new Acquisition('','','','','','','','');
  }

  postAcquisition(acquisition: Acquisition) {
    return this.http.post(this.URL_API, acquisition);
  }

  getAcquisitions() {
    return this.http.get(this.URL_API);
  }

  putAcquisition(acquisition: Acquisition) {
    return this.http.put(this.URL_API + `/${acquisition._id}`, acquisition);
  }

  deleteAcquisition(_id: string) {
    return this.http.delete(this.URL_API + `/${_id}`);
  }
}
