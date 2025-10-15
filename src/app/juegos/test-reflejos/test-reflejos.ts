import { Component, signal } from '@angular/core';
import { Modal } from '../../components/modal/modal/modal';
import { GameInfo } from '../../services/gameInfo/game-info';

@Component({
  selector: 'app-test-reflejos',
  imports: [Modal],
  templateUrl: './test-reflejos.html',
  styleUrl: './test-reflejos.css'
})
export class TestReflejos {

  constructor(private gameInfo : GameInfo){};

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
  imagenSeleccionada : number = 1;
  imagenSeleccionadaURL = signal(`semaforos/1.png`);
  estado = signal("Click para comenzar");
  juegoIniciado = false;
  temporizadorIniciado : boolean = false;
  temporizadorInicio : number = 0;
  temporizadorFinal : number = 0;

  iniciarRondas(){
    this.estado.set("¿Listo?")
    this.juegoIniciado = true;

    setTimeout(() => {
      this.cambiarColorSemaforo();
      console.log("agora");
      
    }, 2000)

    setTimeout(() => {
      this.cambiarColorSemaforo();
      this.temporizador();
    }, Math.random() * 10000 + 1)
  }

  reiniciarRonda(){
    this.juegoIniciado = false;
    this.cambiarColorSemaforo()
  }

  async botonClick(){
    if(this.temporizadorIniciado){ //Inicia el temporizador
      let tiempo = this.temporizador()
      this.gameInfo.subirPuntaje("reflejos", this.user_id, tiempo, this.name);
      this.titulo = "Test Finalizado";
      this.mensaje = `Tu tiempo fue de: ${tiempo}`;
      this.modalAbierto = true;
      console.log("estoy aca putos");
      
    }
    console.log("estoy aca putos");
  }

  temporizador(){
    let fecha = new Date();
    let time = fecha.getTime();
    
    
    if(!this.temporizadorIniciado){
      this.temporizadorInicio = time; 
      this.temporizadorIniciado = true;
      this.estado.set("PRESIONALO");
    }else{
      this.temporizadorFinal = time
      this.temporizadorIniciado = false;
      this.reiniciarRonda()
    }
    let diferenciaSegundos = (this.temporizadorFinal - this.temporizadorInicio)*(1/1000);
    
    return diferenciaSegundos;
  }

  cambiarColorSemaforo(){
    
    if(this.imagenSeleccionada == 3){
      this.imagenSeleccionada = 1;
    }else{
      this.imagenSeleccionada++;
      
    }
    this.imagenSeleccionadaURL.set(`/semaforos/${this.imagenSeleccionada}.png`);
  }

  

}
