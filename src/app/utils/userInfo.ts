import { SupabaseConnection } from "../services/database/supabase-connection";

export async function getUserName(supabase : SupabaseConnection){
    let name = localStorage.getItem("name");
    if(name == null){
        let response = await supabase.getUserName();
        name = response.data.user?.user_metadata["nombre"];
    }
    return name
}

export async function isUserAdmin(supabase : SupabaseConnection) {
    let name = localStorage.getItem("name");
    let isAdmin = false;
    if(name != null){
        let response = await supabase.getUserName(); 
        isAdmin = response.data.user?.user_metadata["admin"];
    }
    return isAdmin;
}