import { CanActivateFn } from '@angular/router';

export const isLoggedGuard: CanActivateFn = (route, state) => {


    let logged = localStorage.getItem("logged");
    let name = localStorage.getItem("name");

    if(logged == null && name == null){
        window.location.href = "/login";
        return false;
    }else{
      return true
    }
};
