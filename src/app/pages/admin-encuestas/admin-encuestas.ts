import { ChangeDetectorRef, Component } from '@angular/core';
import { Encuesta, Encuestas } from '../../services/encuestas/encuestas';

@Component({
  selector: 'app-admin-encuestas',
  imports: [],
  templateUrl: './admin-encuestas.html',
  styleUrl: './admin-encuestas.css'
})
export class AdminEncuestas  {

  encuestas : Encuesta[] = [];
  puntuacionPromedio : number = 0;
  mejoras = {
      juegos: 0,
      disenio: 0,
      conexion: 0
    }

  constructor(private encuestaService : Encuestas, private cdr: ChangeDetectorRef ) {
    encuestaService.obtenerEncuestas().then((response : any) => this.encuestas = response.data).then(response => this.obtenerPromedios());
  }

  obtenerPromedios(): void{
    this.obtenerPromedioMejora();
    this.obtenerPromedioPuntuacion();
    this.cdr.detectChanges();
  }

  private obtenerPromedioPuntuacion(){
    let puntuacionTotal : number = 0;
    this.encuestas.forEach(encuesta => puntuacionTotal += encuesta.puntuacion);
    this.puntuacionPromedio = Math.floor(puntuacionTotal / this.encuestas.length);
  }

  private obtenerPromedioMejora(){
    this.encuestas.forEach(response => this.mejoras[response.mejoras as 'juegos' | 'disenio' | 'conexion']++);

  }

}
