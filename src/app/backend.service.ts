import { Injectable } from '@angular/core';

@Injectable()
export class BackendService {

  backend = "http://www.dymenstein.com/public/mobile/";

  constructor() { }

  getBackEnd() {
    return this.backend;
  }

}
