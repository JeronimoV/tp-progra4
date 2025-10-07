import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Modal } from '../../components/modal/modal/modal';
import { GameInfo } from '../../services/gameInfo/game-info';
import { VolverBoton } from '../../components/volver-boton/volver-boton';

@Component({
  selector: 'app-mayormenor',
  imports: [Modal, VolverBoton],
  templateUrl: './mayormenor.html',
  styleUrl: './mayormenor.css'
})
export class Mayormenor implements OnInit {

  //////modal//////

  mensaje = "Mensaje Prueba";
  titulo = "Titulo Prueba";
  modalAbierto = false;

  cambioModal(event: boolean) {
    this.modalAbierto = event;
    console.log(event);
    
  }

  /////////////////

  constructor(private cdr : ChangeDetectorRef, private gameInfo : GameInfo) { }

  name: string = localStorage.getItem('name') ?? '';
  user_id: string = localStorage.getItem('id') ?? '';
  puntos: number = 0;
  imagenCarta1: string = '';
  imagenCarta1Valor: number = 0;
  imagenCarta2: string = '';
  imagenCarta2Valor: number =0;


  obtenerCartaAleatoria(){
    let index = Math.floor(Math.random() * 7) + 1;
    console.log(index);
    
    return `naipes/${index}.png`;
  }

  iniciarJuego(){
    this.imagenCarta1 = this.obtenerCartaAleatoria();
    this.imagenCarta2 = this.obtenerCartaAleatoria();
    this.imagenCarta1Valor = parseInt(this.imagenCarta1.split('/')[1].split('.')[0]);
    this.imagenCarta2Valor = parseInt(this.imagenCarta2.split('/')[1].split('.')[0]);
    this.puntos = 0;
    console.log(this.imagenCarta1Valor + " " + this.imagenCarta1);
    this.cdr.detectChanges();
  }

  ngOnInit(): void {
    this.iniciarJuego();
  }

  comprobarSeleccion(event: any){
    let cartaMayor = 0

    if(this.imagenCarta1Valor > this.imagenCarta2Valor){
      cartaMayor = this.imagenCarta1Valor;
    }else if(this.imagenCarta1Valor < this.imagenCarta2Valor){
      cartaMayor = this.imagenCarta2Valor;
    }else{
      cartaMayor = 0;
    }

    if((event.target.name=="true" && cartaMayor == this.imagenCarta2Valor) || cartaMayor == 0 ){
      this.seleccionCorrecta();
    }else if(event.target.name=="false" && cartaMayor != this.imagenCarta2Valor){  
      this.seleccionCorrecta();
    }else{
      //Modal de perder
      let secreto = document.getElementsByClassName("secreto")[0];
      secreto.setAttribute("class", "revelado");
      this.gameInfo.subirPuntaje("mayormenor", this.user_id, this.puntos, this.name)
      setTimeout(() => {
        this.mensaje = "Has perdido, has conseguido " + this.puntos + " puntos.";
        this.titulo = "Has perdido";
        this.modalAbierto = true;
        this.cdr.detectChanges();
        secreto.setAttribute("class", "secreto");
        this.iniciarJuego();
      }, 2000);
    }
  }

  seleccionCorrecta(){
    this.puntos++;
    this.imagenCarta1 = this.imagenCarta2;
    this.imagenCarta1Valor = this.imagenCarta2Valor;
    this.imagenCarta2 = this.obtenerCartaAleatoria()
    this.imagenCarta2Valor = parseInt(this.imagenCarta2.split('/')[1].split('.')[0]);
  }
}
