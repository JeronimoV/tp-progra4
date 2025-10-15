import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GameInfo } from '../../services/gameInfo/game-info';
import { Modal } from '../../components/modal/modal/modal';

@Component({
  selector: 'app-preguntados',
  imports: [Modal],
  templateUrl: './preguntados.html',
  styleUrl: './preguntados.css',
})
export class Preguntados implements OnInit {

  constructor(private gameInfo : GameInfo, private cdr : ChangeDetectorRef){}

  ngOnInit(): void {
    this.nuevaRonda();
  }

  //////modal//////

  mensaje = 'Mensaje Prueba';
  titulo = 'Titulo Prueba';
  modalAbierto = false;

  cambioModal(event: boolean) {
    this.modalAbierto = event;
    console.log(event);
  }

  /////////////////

  name: string = localStorage.getItem('name') ?? '';
  user_id: string = localStorage.getItem('id') ?? '';

  puntos: number = 0;
  record: number = 0;
  tiempo: number = 30;

  pregunta: string = '';

  respuesta1: string = '';
  respuesta2: string = '';
  respuesta3: string = '';
  respuesta4: string = '';

  respuestaCorrecta: string = '';

  async elegirPregunta() {
    await fetch('preguntadosPreguntas.json')
      .then((response) => response.json())
      .then((response) => {
        let preguntaObject =
          response.preguntas[Math.floor(Math.random() * response.preguntas.length)];
        this.pregunta = preguntaObject.pregunta;


        preguntaObject.respuestas.forEach((el: string, index : number) => {
          let palabraSpliteada = el.split('-');
          if (palabraSpliteada.length > 1) {
            this.respuestaCorrecta = palabraSpliteada[1];
            preguntaObject.respuestas[index] = palabraSpliteada[1];
          }
        });
        this.respuesta1 = preguntaObject.respuestas[0];
        this.respuesta2 = preguntaObject.respuestas[1];
        this.respuesta3 = preguntaObject.respuestas[2];
        this.respuesta4 = preguntaObject.respuestas[3];
        this.temporizador();
      });
    this.cdr.detectChanges();
  }

  nuevaRonda() {
    this.elegirPregunta();
  }

  finalizarJuego() {
    this.gameInfo.subirPuntaje("preguntados", this.user_id, this.puntos, this.name);
    this.mostrarModal("Perdiste", `La respuesta era "${this.respuestaCorrecta}"`)
    this.puntos = 0;
    this.nuevaRonda();
  }

  mostrarModal(titulo: string, mensaje: string) {
    this.modalAbierto = true;
    this.titulo = titulo;
    this.mensaje = mensaje;
  }

  elegirRespuesta(event : any) {
    let respuesta = event.target.innerText;
    this.verificarRespuesta(respuesta);
  }

  verificarRespuesta(respuesta : string) {
    if(respuesta == this.respuestaCorrecta){
      this.puntos++;
      this.nuevaRonda();
    }else{
      this.finalizarJuego()
    }
  }

  temporizador(){
      let countdown = setInterval(() => {
      this.tiempo--;
      console.log(this.tiempo);
      
    if (this.tiempo <= 0) {
      clearInterval(countdown);
      this.finalizarJuego();
      this.tiempo = 30;
    }
    this.cdr.detectChanges();
  }, 1000);

  }
}
