import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {

  constructor() { }

  public getId():Number {
    return parseInt(localStorage.getItem("id"));
  }
}
