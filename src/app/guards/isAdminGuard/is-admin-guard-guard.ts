import { CanActivateFn } from '@angular/router';
import { isUserAdmin } from '../../utils/userInfo';

export const isAdminGuardGuard: CanActivateFn = (route, state) => {
  let respuesta = localStorage.getItem('admin');
  if (respuesta == "true") {
    return true;
  }else{
    window.location.href = "/";
    return false;
  }
};
