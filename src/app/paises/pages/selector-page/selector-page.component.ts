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
  regiones  : string[] = [];
  paises    : PaisesSmall[] = [];
  paisCodigo: Pais[] = [];
  //fronteras : string[] = [];
  fronteras : PaisesSmall[] = [];


  //UI
  cargando: boolean = false;


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
        tap( ( _ ) => { this.regiones = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
                        this.miFormulario.get('pais')?.reset('');
                        this.cargando = true;
                        //this.miFormulario.get('frontera')?.disable();
        } ),
        switchMap( region => this.pasisesService.getPaisesPorRegion( region ) )
      )
      .subscribe( paises => {
        console.log(paises);
        this.paises = paises || [];
        this.cargando = false;
      });


    //cuando cambie el país
    this.miFormulario.get('pais')?.valueChanges
      .pipe(
        tap( ( _ ) => {
          this.fronteras = [];
          this.miFormulario.get('frontera')?.reset('');
          //this.miFormulario.get('frontera')?.enable();
          this.cargando = true;
        } ),
        switchMap( codigo => this.pasisesService.getPaisPorCodigo( codigo )),
        switchMap( pais => this.pasisesService.getPaisesPorCodigos( pais?.borders! ))
      )
      .subscribe( paises => {
        console.log(paises);
        this.fronteras = paises;
       // this.fronteras = pais?.borders || [];
        this.cargando = false;
      })

  }


  guardar(){
    console.log(this.miFormulario.value);
  }

}
