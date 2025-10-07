import { Component} from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { AsyncPipe, DatePipe } from '@angular/common';
import { RealtimeChat, Message } from '../../services/database/realtime-chat/realtime-chat';

@Component({
  selector: 'app-bienvenida',
  imports: [RouterLink, FormsModule, AsyncPipe, DatePipe],
  templateUrl: './bienvenida.html',
  styleUrls: ['./bienvenida.css']
})
export class Bienvenida {

  mensajes : Observable<Message[]> = new Observable<Message[]>()

  constructor(private realtimeChat : RealtimeChat) {
    this.mensajes = realtimeChat.getMessages();
  }

  name = localStorage.getItem("name") ?? ""
  texto = ""
  bienvenida = localStorage.getItem("bienvenida") ?? null;

  darBienvenida(){
    console.log(this.bienvenida);
    
    localStorage.setItem("bienvenida", "true");
    this.bienvenida = "true";
    
    console.log(this.bienvenida);
  }

  enviarMensaje(){
    
    if(this.name != null && this.texto.trim() != ""){
      this.realtimeChat.sendMessage(this.name, this.texto).then(res => console.log(res))
      this.texto = "";
    }
    
  }
}
