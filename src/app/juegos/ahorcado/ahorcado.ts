import { Component, OnInit } from '@angular/core';
import { Modal } from '../../components/modal/modal/modal';
import { GameInfo } from '../../services/gameInfo/game-info';
@Component({
  selector: 'app-ahorcado',
  imports: [Modal],
  templateUrl: './ahorcado.html',
  styleUrl: './ahorcado.css',
})
export class Ahorcado implements OnInit {
  constructor(private gameInfo: GameInfo) {}

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
  vidasRestantes: number = 6;
  palabraSecreta: string[] = [];
  letrasDescubiertas: string[] = [];
  monigotePosicion = `ahorcado-img/${7 - this.vidasRestantes}.png`;

  ////////////////// Pasos de la app //////////////////
  //1- Obtener palabra secreta del archivo json -   hechoobtenerPalabraSecreta()
  //2- Mapear la palabra secreta en el html con "_" por cada letra - mapearArreglo()
  //3- Obtener la letra que el usuario presiona - obtenerLetra()
  //4- Comprobar si la letra existe en la palabra secreta - comprobarLetraEnLaPalabra()

  ////////////////// Mapeo y obtencion de palabras  //////////////////
  ngOnInit(): void {
    this.obtenerPalabraSecreta();
  }

  async obtenerPalabraSecreta() {
    //Obtiene la palabra secreta del archivo json
    await fetch('palabrasAhorcado.json')
      .then((res) => res.json())
      .then((data) => {
        let palabras = data.palabras;
        let palabraRandom = palabras[Math.floor(Math.random() * palabras.length)];
        this.palabraSecreta = palabraRandom.toUpperCase().split('');
      });
    this.palabraSecreta.forEach((letra) => {
      //Esto por cada letra que tenga la palabra secreta, mapea el arreglo de las letras descubiertas como "_" para que se mapeen luego
      this.letrasDescubiertas.push('_');
    });
    console.log(this.palabraSecreta);

    this.mapearArreglo();
  }

  mapearArreglo() {
    //Mapea en el html la letra descubierta y no descubierta
    let contenedor = document.getElementsByClassName('casilleros')[0];
    contenedor.innerHTML = ''; //Limpia el contenedor para que no se repitan las letras
    console.log(this.letrasDescubiertas);

    this.letrasDescubiertas.forEach((letra) => {
      let texto = document.createElement('p');
      texto.innerHTML = letra;
      contenedor.appendChild(texto);
    });
    console.log('Esta es la palabra: ' + this.palabraSecreta);
  }

  ////////////////// Sistema de Comprobacion de letras  //////////////////

  obtenerLetra(letra: any) {
    //obtiene la letra del evento click
    this.comprobarLetraEnLaPalabra(letra.target.name);
  }

  comprobarLetraEnLaPalabra(letra: string) {
    //Recibe la letra que el usuario presiono
    console.log(letra);

    let letraExiste = this.palabraSecreta.includes(letra); //Comprueba que exista la letra en el arreglo
    let letraYaDescubierta = this.letrasDescubiertas.includes(letra); //Comprueba que la letra no haya sido descubierta ya
    if (letraExiste && !letraYaDescubierta) {
      this.palabraSecreta.forEach((caracter, index) => {
        //Como si existe, lo recorre

        if (letra == caracter) {
          //Si la letra que le pasamos al metodo es igual al caracter en el que esta parado
          this.letrasDescubiertas[index] = letra; //reemplaza el "_" por la letra
        }
      });

      this.puntos++; //Suma un punto
      this.cambiarColorTecla(letra, true);
      this.mapearArreglo();

      this.comprobarVictoria();
    } else { // Si la letra no existe
      if (this.puntos > 0) {
        this.puntos--; //Resta un punto
      }

      this.cambiarColorTecla(letra, false);
      this.vidasRestantes--; //Si no existe, resta una vida
      this.monigotePosicion = `ahorcado-img/${7 - this.vidasRestantes}.png`;
      this.comprobarDerrota();
    }

  }

  comprobarVictoria() {
    if (this.letrasDescubiertas.join('') == this.palabraSecreta.join('')) {
      //Comprueba si las letras descubiertas son iguales a la palabra secreta
      this.mostrarModal('Ganaste', 'Felicitaciones, has adivinado la palabra!');
      this.finalizarJuego();
    }
  }

  comprobarDerrota(){
    if (this.vidasRestantes <= 0) {
      this.mostrarModal('Perdiste', 'La palabra era: ' + this.palabraSecreta.join(''));
      this.finalizarJuego();
    }
  }

  cambiarColorTecla(letra: string, opcion: boolean) {
    let tecla = document.getElementsByName(letra)[0];
    if (opcion) {
      tecla.setAttribute('class', 'tecla-correcta');
    } else {
      tecla.setAttribute('class', 'tecla-erronea');
    }
  }

  reiniciarColoresTecla() {
    let contenedor = document.getElementsByClassName('teclado')[0];
    let children = contenedor.children;

    for (let i = 0; i < children.length; i++) {
      children[i].setAttribute('class', 'tecla');
    }
  }

  finalizarJuego() {
    this.gameInfo.subirPuntaje('ahorcado', this.user_id, this.puntos, this.name);
    this.letrasDescubiertas = []; //Reinicia el arreglo de letras descubiertas
    this.vidasRestantes = 6; //Reinicia las vidas
    this.puntos = 0; //Renicia puntos
    this.monigotePosicion = `ahorcado-img/${7 - this.vidasRestantes}.png`;
    this.obtenerPalabraSecreta();
    this.reiniciarColoresTecla();
  }

  mostrarModal(titulo: string, mensaje: string) {
    this.modalAbierto = true;
    this.titulo = titulo;
    this.mensaje = mensaje;
  }
}
