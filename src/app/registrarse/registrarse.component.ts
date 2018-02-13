import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.css']
})
export class RegistrarseComponent implements OnInit {

  registro:FormGroup;

  constructor() { }

  ngOnInit() {
    this.registro = new FormGroup({
      usuario: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      cpf: new FormControl('', Validators.required),
      grito: new FormControl()
    });
  }

  onSubmit() {
    
  }

}
