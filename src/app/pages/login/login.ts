import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SupabaseConnection } from '../../services/database/supabase-connection';
import { Router } from '@angular/router';
import { Navbar } from '../../components/navbar/navbar/navbar';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  constructor(private supabase: SupabaseConnection, private router: Router) {}

  email = "";
  contrasena = "";

  accesoRapido(email:string, contraseña: string){
    this.email = email;
    this.contrasena = contraseña;
    this.comprobarDatos();
  }

  comprobarDatos(){
    this.supabase.signIn(this.email, this.contrasena).then((response) => {
      if (response.error != null) {
        alert('Error al iniciar el usuario: ' + response.error.message);
      }else{
        localStorage.setItem('logged', "true");
        window.location.href = '/';
      }
    });
  }
}
