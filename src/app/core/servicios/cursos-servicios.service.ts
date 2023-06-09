import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, mergeMap, tap } from 'rxjs';
import { Cursos, cursoWithSubject } from 'src/app/cursos/models';
import { AppState } from 'src/app/store';


const CURSOS_MOCKS : Cursos[] = [
  {
    id:1,
    subjectId: 1,
    fechaFin: new Date(),
    fechaIni: new Date(),
  },
  {
    id:2,
    subjectId: 2,
    fechaFin: new Date(),
    fechaIni: new Date(),
  },
  {
    id:3,
    subjectId: 3,
    fechaFin: new Date(),
    fechaIni: new Date(),
  }
]

@Injectable({
  providedIn: 'root'
})
export class CursosServiciosService {
  private cursos$ = new BehaviorSubject<Cursos[]>([]);
  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private store: Store <AppState>,
  ) { }

  obtenerCursos(): Observable<Cursos[]>{
    return this.httpClient.get<Cursos[]>('http://localhost:3000/courses')
      .pipe(
        tap ((cursos: Cursos[])=> this.cursos$.next( cursos )),
        mergeMap(()=> this.cursos$.asObservable())
  
      )}


      obtenerCursosWithSubject(): Observable<cursoWithSubject[]>{
        return this.httpClient.get<cursoWithSubject[]>('http://localhost:3000/courses?_expand=subject')
        }

}
