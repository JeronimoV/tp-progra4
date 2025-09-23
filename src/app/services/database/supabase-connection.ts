import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class SupabaseConnection {
  supabase = createClient(environment.supabaseUrl, environment.supabaseKey);

  signUp(email: string, password: string, nombre: string, apellido: string, edad: number) {
    return this.supabase.auth.signUp({
      email,
      password,
      options: { data: { nombre: nombre, apellido: apellido, edad: edad } },
    });
  }

  signIn(email: string, password: string) {
    return this.supabase.auth.signInWithPassword({ email, password });
  }

  signOut() {
    return this.supabase.auth.signOut();
  }

  getUserName() {
    return this.supabase.auth.getUser();
  }

  sendMessage(id :string,message: string) {
    return this.supabase.from('messages').insert([{id : Number ,message: message }]);
  }

  posts = this.supabase.channel('public:messages').on("postgres_changes", { event: "*", schema: "public", table: "messages" }, (payload) => {
    console.log('Change received!', payload)
  }).subscribe();
}
