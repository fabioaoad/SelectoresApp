import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PaisesService} from "../../services/paises.service";
import {PaisesSmall} from "../../interfaces/paises.interface";

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: [
  ]
})
export class SelectorPageComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    region: ['', Validators.required],
    pais: ['', Validators.required],
  });

  // llenar selectores

  regiones: string[] = [];
  paises: PaisesSmall[] = [];

  constructor( private fb: FormBuilder,
               private pasisesService: PaisesService ) { }

  ngOnInit(): void {

    this.regiones = this.pasisesService.regiones;

    //cuando cambie la region(continente)
    this.miFormulario.get('region')?.valueChanges
      .subscribe( region => {
        console.log(region);
        this.pasisesService.getPaisesPorRegion( region )
          .subscribe( paises => {
            this.paises = paises;
            console.log(paises);
          })
      });
  }


  guardar(){
    console.log(this.miFormulario.value);
  }

}
