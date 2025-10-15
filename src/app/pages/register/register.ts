import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SupabaseConnection } from '../../services/database/supabase-connection';
import { Modal } from "../../components/modal/modal/modal";

@Component({
  selector: 'app-register',
  imports: [FormsModule, Modal],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  constructor(private supabase: SupabaseConnection, private cdr : ChangeDetectorRef) {}

  //////modal//////

  mensaje = "Mensaje Prueba";
  titulo = "Titulo Prueba";
  modalAbierto = false;

  cambioModal(event: boolean) {
    this.modalAbierto = event;
    console.log(event);
    
  }

  /////////////////

  email = '';
  nombre = '';
  apellido = '';
  edad = 0;
  contrasena = '';

  comprobarDatos() {
    this.supabase.signUp(this.email, this.contrasena, this.nombre, this.apellido, this.edad).then((response) => {
      console.log(response.error != null);
      
      if (response.error != null) {
        this.modalAbierto=true;
        this.titulo="Error";
        this.mensaje=response.error.message;
        this.cdr.detectChanges();
      }else{
        localStorage.setItem('logged', "true");
        window.location.href = '/';
      }
    });
  }
}
