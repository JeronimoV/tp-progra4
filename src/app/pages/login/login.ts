import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SupabaseConnection } from '../../services/database/supabase-connection';
import { Modal } from '../../components/modal/modal/modal';

@Component({
  selector: 'app-login',
  imports: [FormsModule, Modal],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
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
        this.cdr.detectChanges();
      }else{
        localStorage.setItem('logged', "true");
        localStorage.setItem("id", response.data.user.id);
        localStorage.setItem("name", response.data.user.user_metadata["nombre"]);
        localStorage.setItem("admin", response.data.user.user_metadata["admin"]);
        
        
        window.location.href = '/';
      }
    });
  }
}
