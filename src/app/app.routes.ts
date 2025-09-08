import { Routes } from '@angular/router';
import { App } from './app';
import { Inicio } from './pages/inicio/inicio';
import { QuienSoy } from './pages/quien-soy/quien-soy';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';

export const routes: Routes = [
    {path:"inicio", component: Inicio},
    {path:"quien-soy", component: QuienSoy},
    {path:"login", component: Login},
    {path:"register", component: Register},
    {path:"**", redirectTo:""}
];
