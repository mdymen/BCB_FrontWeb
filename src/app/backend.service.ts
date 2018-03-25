import { Injectable } from '@angular/core';

@Injectable()
export class BackendService {

  backend = "http://www.dymenstein.com/public/mobile/";
  backendAdmin = "http://www.dymenstein.com/public/admin/";;

  constructor() { }

  getBackEnd() {
    return this.backend;
  }

  getBackEndAdmin() {
    return this.backendAdmin;
  }

}
