import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SupabaseConnection } from '../../services/database/supabase-connection';
import { Router } from '@angular/router';
import { Modal } from '../../components/modal/modal/modal';

@Component({
  selector: 'app-login',
  imports: [FormsModule, Modal],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  constructor(private supabase: SupabaseConnection, private router: Router) {}


  //////modal//////

  mensaje = "Mensaje Prueba";
  titulo = "Titulo Prueba";
  modalAbierto = false;

  cambioModal(event: boolean) {
    this.modalAbierto = event;
    console.log(event);
    
  }

  /////////////////


  email = "";
  contrasena = "";

  accesoRapido(email:string, contraseña: string){
    console.log(localStorage.getItem('logged'));
    
    this.email = email;
    this.contrasena = contraseña;
    this.comprobarDatos();
  }

  comprobarDatos(){
    this.supabase.signIn(this.email, this.contrasena).then((response) => {
      if (response.error != null) {
        this.modalAbierto = true;
        this.titulo = "Error";
        this.mensaje = response.error.message;
      }else{
        localStorage.setItem('logged', "true");
        window.location.href = '/';
      }
    });
  }
}
