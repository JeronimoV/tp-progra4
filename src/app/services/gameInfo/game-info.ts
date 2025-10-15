import { Injectable } from '@angular/core';
import { SupabaseConnection } from '../database/supabase-connection';


@Injectable({
  providedIn: 'root'
})
export class GameInfo {
  constructor(private connection : SupabaseConnection){}

  async subirPuntaje(game: string, user_id : string, points :number, name:string){
    let respuesta = await this.connection.supabase.from("gamePoints").select("*").eq("user_id", user_id).eq("game", game);
    
    if(respuesta.data != null && respuesta.data.length > 0){
      this.actualizarPuntaje(points,user_id,game);
      
    }else{
      this.crearPuntaje(game,user_id,points, name);
    }
  }

  private async crearPuntaje(game : string, user_id : string, points : number, name : string) {
    await this.connection.supabase.from("gamePoints").insert([{game: game, user_id: user_id, points: points, name: name}]);
  }

  private async actualizarPuntaje(points : number, user_id : string, game: string){
    await this.connection.supabase.from("gamePoints").update({"points": points}).eq("user_id", user_id).eq("game", game);
  }

  async obtenerPuntajes(){
    let respuesta = await this.connection.supabase.from("gamePoints").select("*");
    return respuesta;
  }

}
