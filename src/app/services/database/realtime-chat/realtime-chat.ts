import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SupabaseConnection } from '../supabase-connection';


export interface Message{
  id: number;
  name : string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})

export class RealtimeChat {

  chats = new BehaviorSubject<Message[]>([]);

  constructor(private connection : SupabaseConnection){
    connection.supabase
    .channel('public:messages')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'messages' }, (payload) => {
      const newMsg = payload.new as Message;
      this.chats.next([...this.chats.value, newMsg]);
      console.log(newMsg);
    })
    .subscribe();
  }

    getMessages(){
      return this.chats.asObservable();
    }

    sendMessage(name: string, message: string) {
      return this.connection.supabase.from('messages').insert([{ name: name, message: message }]);
    }
}
