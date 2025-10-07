import { SupabaseConnection } from "../services/database/supabase-connection";

export function isLogged(){
    let logged = localStorage.getItem("logged");
    let name = localStorage.getItem("name");

    if(logged != null && name != null){
        return true;
    }else{
        return false;
    }
}

export async function getUserName(supabase : SupabaseConnection){
    let name = localStorage.getItem("name");
    if(name == null){
        let response = await supabase.getUserName();
        name = response.data.user?.user_metadata["nombre"];
    }
    return name
}