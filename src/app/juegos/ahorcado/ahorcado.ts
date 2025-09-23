import { Component, OnInit } from '@angular/core';
import { Modal } from '../../components/modal/modal/modal';
@Component({
  selector: 'app-ahorcado',
  imports: [Modal],
  templateUrl: './ahorcado.html',
  styleUrl: './ahorcado.css'
})
export class Ahorcado implements OnInit {

  //////modal//////

  mensaje = "Mensaje Prueba";
  titulo = "Titulo Prueba";
  modalAbierto = false;

  cambioModal(event: boolean) {
    this.modalAbierto = event;
    console.log(event);
    
  }

  /////////////////

  puntos : number = 0;
  vidasRestantes : number = 6;
  palabraSecreta : string [] = []; 
  letrasDescubiertas : string[] = [];

  ////////////////// Pasos de la app //////////////////
  //1- Obtener palabra secreta del archivo json -   hechoobtenerPalabraSecreta()
  //2- Mapear la palabra secreta en el html con "_" por cada letra - mapearArreglo()
  //3- Obtener la letra que el usuario presiona - obtenerLetra()
  //4- Comprobar si la letra existe en la palabra secreta - comprobarLetraEnLaPalabra()


  ////////////////// Mapeo y obtencion de palabras  //////////////////
  ngOnInit(): void {
    this.obtenerPalabraSecreta();
  }

  async obtenerPalabraSecreta(){ //Obtiene la palabra secreta del archivo json
    this.letrasDescubiertas = []; //Reinicia el arreglo de letras descubiertas
    this.vidasRestantes = 6; //Reinicia las vidas
    await fetch("palabrasAhorcado.json").then(res => res.json()).then(data => {
      let palabras = data.palabras;
      let palabraRandom = palabras[Math.floor(Math.random() * palabras.length)];
      this.palabraSecreta = palabraRandom.toUpperCase().split("");
    });
    this.palabraSecreta.forEach(letra => { //Esto por cada letra que tenga la palabra secreta, mapea el arreglo de las letras descubiertas como "_" para que se mapeen luego
      this.letrasDescubiertas.push("_");
    });
    console.log(this.palabraSecreta);
    

    this.mapearArreglo();
  }

  mapearArreglo(){ //Mapea en el html la letra descubierta y no descubierta
    let contenedor = document.getElementsByClassName("casilleros")[0];
    contenedor.innerHTML = ""; //Limpia el contenedor para que no se repitan las letras
    console.log(this.letrasDescubiertas);
    
    this.letrasDescubiertas.forEach(letra => {
      let texto = document.createElement("p");
      texto.innerHTML = letra;
      contenedor.appendChild(texto);
    });
    console.log("Esta es la palabra: " + this.palabraSecreta);
    

  }

  ////////////////// Sistema de Comprobacion de letras  //////////////////

  obtenerLetra(letra : any){ //obtiene la letra del evento click
    this.comprobarLetraEnLaPalabra(letra.target.name);
  }

  comprobarLetraEnLaPalabra(letra :string){ //Recibe la letra que el usuario presiono
    let letraExiste = this.palabraSecreta.includes(letra); //Comprueba que exista la letra en el arreglo
    if(letraExiste){ 
      this.palabraSecreta.forEach((caracter, index) => { //Como si existe, lo recorre
        console.log("este" + letra + "y este" + caracter);
        
      if(letra == caracter){ //Si la letra que le pasamos al metodo es igual al caracter en el que esta parado
        this.letrasDescubiertas[index] = letra; //reemplaza el "_" por la letra
        console.log("Entre putos");
        
      }
    });
    this.puntos++; //Suma un punto
    this.mapearArreglo();
    if(this.letrasDescubiertas.join("") == this.palabraSecreta.join("")){ //Comprueba si las letras descubiertas son iguales a la palabra secreta
      this.modalAbierto = true;
      this.titulo = "Ganaste";
      this.mensaje = "Felicitaciones, has adivinado la palabra!";
      this.obtenerPalabraSecreta();
    }
    }else{
      if(this.puntos > 0){
        this.puntos--; //Resta un punto
      }
      this.vidasRestantes--; //Si no existe, resta una vida
    }

    if(this.vidasRestantes <= 0){
      this.puntos = 0;
      this.modalAbierto = true;
      this.titulo = "Perdiste";
      this.mensaje = "La palabra era: " + this.palabraSecreta.join("");
      this.obtenerPalabraSecreta();
    }
  }

}
