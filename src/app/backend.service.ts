import { Injectable } from '@angular/core';

@Injectable()
export class BackendService {

  backend = "http://www.dymenstein.com/public/mobile/";
  backendAdmin = "http://www.dymenstein.com/public/admin/";;
  backendNormal = "http://www.dymenstein.com/public/";

  constructor() { }

  getBackEnd() {
    return this.backend;
  }

  getBackEndAdmin() {
    return this.backendAdmin;
  }

  getBackEndNormal() {
    return this.backendNormal;
  }
}
