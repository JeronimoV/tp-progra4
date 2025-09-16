import { Routes } from '@angular/router';
import { QuienSoy } from './pages/quien-soy/quien-soy';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Bienvenida } from './pages/bienvenida/bienvenida';

export const routes: Routes = [
    {path:"", component: Bienvenida},
    {path:"quien-soy", component: QuienSoy},
    {path:"login", component: Login},
    {path:"register", component: Register},
    {path:"**", redirectTo:""}
];
