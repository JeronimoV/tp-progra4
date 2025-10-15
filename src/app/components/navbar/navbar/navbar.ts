import { Component, signal, OnInit } from '@angular/core';
import { Router, RouterLink} from '@angular/router';
import { SupabaseConnection } from '../../../services/database/supabase-connection';
import { getUserName } from '../../../utils/userInfo';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit {
  constructor(private router: Router, private supabase: SupabaseConnection) {}
  nombre = signal("");
  isAdmin = signal(localStorage.getItem("admin") === "true");

  async ngOnInit() {
    let response = await getUserName(this.supabase)
    if(response != null){
      this.nombre.set(response);
      localStorage.setItem("name", response)
    }
  }

  loggedIn = signal(localStorage.getItem("logged") === "true");

logout() {
    localStorage.clear();
    this.loggedIn.set(false);
    this.nombre.set("");
    this.router.navigate(['/login']);
  }
}
