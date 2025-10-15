import { Injectable } from '@angular/core';
import { SupabaseConnection } from '../database/supabase-connection';

export interface Encuesta {
  opinion: string;
  puntuacion: number;
  mejoras: string;
}

@Injectable({
  providedIn: 'root'
})


export class Encuestas {
  constructor(private connection : SupabaseConnection){}

  enviarEncuesta(encuesta: any){
    return this.connection.supabase.from("encuestas").insert([encuesta]);
  }

  async obtenerEncuestas(){
    let respuesta = await this.connection.supabase.from("encuestas").select("*");
    return respuesta as { data: Encuesta[] | null, error: any, status: number, statusText: string };;
  }
}
