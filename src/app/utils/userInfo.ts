import { SupabaseConnection } from "../services/database/supabase-connection";

export async function getUserName(supabase : SupabaseConnection){
    let name = localStorage.getItem("name");
    if(name == null){
        let response = await supabase.getUserName();
        name = response.data.user?.user_metadata["nombre"];
    }
    return name
}