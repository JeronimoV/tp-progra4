import { Component , OnInit} from '@angular/core';
import { RouterLink } from '@angular/router';
import { SupabaseConnection } from '../../services/database/supabase-connection';

@Component({
  selector: 'app-bienvenida',
  imports: [RouterLink],
  templateUrl: './bienvenida.html',
  styleUrls: ['./bienvenida.css']
})
export class Bienvenida implements OnInit {

  constructor(private supabase : SupabaseConnection) {}

  bienvenida : boolean = true;

  ngOnInit(): void {
    this.supabase.sendMessage('1','hola');
  }

  darBienvenida(){
    this.bienvenida = false;

  }
}
