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
import { isLoggedGuard } from './guards/is-logged-guard';

export const routes: Routes = [
    {path:"", component: Bienvenida, canActivate: [isLoggedGuard]},
    {path:"quien-soy", component: QuienSoy, canActivate: [isLoggedGuard]},
    {path:"login", component: Login},
    {path:"register", component: Register},
    {path:"ahorcado", component: Ahorcado, canActivate: [isLoggedGuard]},
    {path:"mayormenor", component: Mayormenor, canActivate: [isLoggedGuard]},
    {path:"preguntados", component: Preguntados, canActivate: [isLoggedGuard]},
    {path:"testReflejos", component: TestReflejos, canActivate: [isLoggedGuard]},
    {path:"rankings", component: Rankings, canActivate: [isLoggedGuard]},
    {path:"**", redirectTo:""}
];
