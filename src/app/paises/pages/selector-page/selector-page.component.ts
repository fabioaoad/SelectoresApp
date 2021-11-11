import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PaisesService} from "../../services/paises.service";
import {Pais, PaisesSmall} from "../../interfaces/paises.interface";
import {switchMap, tap} from "rxjs";

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: [
  ]
})
export class SelectorPageComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    region  : ['', Validators.required],
    pais    : ['', Validators.required],
    frontera: ['', Validators.required],
  });

  // llenar selectores

  regiones: string[] = [];
  paises: PaisesSmall[] = [];
  paisCodigo: Pais[] = [];

  constructor( private fb: FormBuilder,
               private pasisesService: PaisesService ) { }

  ngOnInit(): void {

    this.regiones = this.pasisesService.regiones;

    //cuando cambie la region(continente)
    // this.miFormulario.get('region')?.valueChanges
    //   .subscribe( region => {
    //     console.log(region);
    //     this.pasisesService.getPaisesPorRegion( region )
    //       .subscribe( paises => {
    //         this.paises = paises;
    //         console.log(paises);
    //       })
    //   });

    //cuando cambie la region(continente)
    this.miFormulario.get('region')?.valueChanges
      .pipe(
        tap( ( _ ) => { this.miFormulario.get('pais')?.reset('') } ),
        switchMap( region => this.pasisesService.getPaisesPorRegion( region ) )
      )
      .subscribe( paises => {
        console.log(paises);
        this.paises = paises;
      });


    //cuando cambie el país
    this.miFormulario.get('pais')?.valueChanges
      .subscribe( codigo => {
        console.log(codigo);
      })

  }


  guardar(){
    console.log(this.miFormulario.value);
  }

}
