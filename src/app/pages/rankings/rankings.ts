import { ChangeDetectorRef, Component } from '@angular/core';
import { GameInfo } from '../../services/gameInfo/game-info';
import { RankingFormatPipe } from '../../pipes/ranking-format-pipe';

@Component({
  selector: 'app-rankings',
  imports: [RankingFormatPipe],
  templateUrl: './rankings.html',
  styleUrl: './rankings.css',
})
export class Rankings {
  cantidadRankings = 15;

  puntajes: any = [];
  puntajesAhorcado: any = [];
  puntajesMayorMenor: any = [];
  puntajesPreguntados: any = [];
  puntajesReflejos: any = [];

  cadenaDeEjecuion: any = [
    this.puntajesAhorcado,
    this.puntajesMayorMenor,
    this.puntajesPreguntados,
    this.puntajesReflejos,
  ];

  constructor(private gameInfo: GameInfo, private cdr: ChangeDetectorRef) {
    gameInfo
      .obtenerPuntajes()
      .then((response) => (this.puntajes = response.data))
      .then((response) => this.separarPuntajesJuegos())
      .then((response) => this.bucleEjecuionVariables(this.ordenarPuntajes.bind(this)))
      .then((response) => this.bucleEjecuionVariables(this.rellenarArrays.bind(this)))
      .then((response) => cdr.detectChanges());
  }

  separarPuntajesJuegos() {
    this.puntajes.forEach((element: any) => {
      console.log(element);

      switch (element.game) {
        case 'ahorcado':
          this.puntajesAhorcado.push(element);
          break;
        case 'preguntados':
          this.puntajesPreguntados.push(element);
          break;
        case 'mayormenor':
          this.puntajesMayorMenor.push(element);
          break;
        case 'reflejos':
          this.puntajesReflejos.push(element);
          break;
      }
    });
  }

  bucleEjecuionVariables(callback: Function) {
    this.cadenaDeEjecuion.forEach((el: any) => {
      callback(el);
    });
  }

  ordenarPuntajes(array: any) {
    
    array.sort((a: any, b: any) => {
      if (array == this.puntajesReflejos) {
        if (a.points < b.points) {
          return -1;
        } else {
          return 1;
        }
      } else {
        if (a.points < b.points) {
          return 1;
        } else {
          return -1;
        }
      }
    });
  }

  rellenarArrays(array: any) {
    let cantidadAModificar = array.length - this.cantidadRankings;
    if (array.length > this.cantidadRankings) {
      array.slice(-cantidadAModificar);
    } else {
      for (let i = 0; i < Math.abs(cantidadAModificar); i++) {
        array.push({ name: '', points: "" });
      }
    }
  }
}
