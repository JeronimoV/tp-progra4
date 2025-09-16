import { Component, signal, OnInit } from '@angular/core';
import { Router, RouterLink} from '@angular/router';
import { SupabaseConnection } from '../../../services/database/supabase-connection';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit {
  constructor(private router: Router, private supabase: SupabaseConnection) {}
  nombre = signal("");

  async ngOnInit() {
    this.nombre.set
    let response = await this.supabase.getUserName();
    this.nombre.set(response.data.user?.user_metadata["nombre"]);
  }

  loggedIn = signal(localStorage.getItem("logged") === "true");

logout() {
    localStorage.removeItem("logged");
    this.loggedIn.set(false);
    this.nombre.set("");
    this.router.navigate(['/login']);
  }
}
