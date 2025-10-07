import { Component , OnInit} from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { RealtimeChat, Message } from '../../services/database/realtime-chat/realtime-chat';

@Component({
  selector: 'app-bienvenida',
  imports: [RouterLink, FormsModule, AsyncPipe],
  templateUrl: './bienvenida.html',
  styleUrls: ['./bienvenida.css']
})
export class Bienvenida implements OnInit {

  mensajes : Observable<Message[]> = new Observable<Message[]>()

  constructor(private realtimeChat : RealtimeChat) {
    this.mensajes = realtimeChat.getMessages();
  }

  texto = ""
  bienvenida : boolean = true;

  ngOnInit(): void {
    console.log(this.texto);
    
  }

  darBienvenida(){
    this.bienvenida = false;

  }

  enviarMensaje(){
    let name = localStorage.getItem("name");
    
    
    if(name != null){
      this.realtimeChat.sendMessage(name, this.texto).then(res => console.log(res))
      this.texto = "";
    }
  }
}
