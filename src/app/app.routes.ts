import { Routes } from '@angular/router';
import { QuienSoy } from './pages/quien-soy/quien-soy';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Bienvenida } from './pages/bienvenida/bienvenida';
import { Ahorcado } from './juegos/ahorcado/ahorcado';
import { Mayormenor } from './juegos/mayormenor/mayormenor';
import { Preguntados } from './juegos/preguntados/preguntados';
import { TestReflejos } from './juegos/test-reflejos/test-reflejos';
import { Rankings } from './pages/rankings/rankings';

export const routes: Routes = [
    {path:"", component: Bienvenida},
    {path:"quien-soy", component: QuienSoy},
    {path:"login", component: Login},
    {path:"register", component: Register},
    {path:"ahorcado", component: Ahorcado},
    {path:"mayormenor", component: Mayormenor},
    {path:"preguntados", component: Preguntados},
    {path:"testReflejos", component: TestReflejos},
    {path:"rankings", component: Rankings},
    {path:"**", redirectTo:""}
];
