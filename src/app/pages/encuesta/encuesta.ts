import { ChangeDetectorRef, Component } from '@angular/core';
import { Encuestas } from '../../services/encuestas/encuestas';
import { Modal } from '../../components/modal/modal/modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-encuesta',
  imports: [Modal],
  templateUrl: './encuesta.html',
  styleUrl: './encuesta.css'
})
export class Encuesta {

  constructor(private encuestaService : Encuestas, private router : Router, private cdr : ChangeDetectorRef) {}

  //////modal//////

  mensaje = 'Mensaje Prueba';
  titulo = 'Titulo Prueba';
  modalAbierto = false;

  cambioModal(event: boolean) {
    this.modalAbierto = event;
    console.log(event);
    if(this.redirigir){
      this.router.navigate(['/']);
    }
  }

  /////////////////

  redirigir : boolean = false;

  data : any = {
    user_id: localStorage.getItem("id"),
    nombre: "",
    apellido: "",
    edad: 0,
    numeroTelefono: "",
    opinion: "",
    puntuacion: 10,
    mejoras: ""
  }

  getData(event : any){
    this.data[event.target.name] = event.target.value;
    
  }

  async enviarEncuesta(event : any){
    event.preventDefault();
    if(this.data.nombre == "" || this.data.apellido == "" || this.data.edad == 0 || this.data.numeroTelefono == "" || this.data.opinion == "" || this.data.puntuacion == 0 || this.data.mejoras == "" || this.data.edad < 18 || this.data.edad > 99){
      this.modalAbierto = true;
      this.titulo = "Error";
      this.mensaje = "Por favor, complete todos los campos correctamente. La edad debe estar entre 18 y 99 años.";
    }else{
      let respuesta = await this.encuestaService.enviarEncuesta(this.data);
      if(respuesta.error == null){
        this.redirigir = true;
        this.modalAbierto = true;
        this.titulo = "Completado";
        this.mensaje = "Encuesta completada con exito. Gracias por su participación.";
      }else{
        this.modalAbierto = true;
        this.titulo = "Error";
        this.mensaje = "Algo fallo en el servidor. Tu no hiciste nada mal, no te sientas culpable.";
      }
    }
    this.cdr.detectChanges();
  }
}
