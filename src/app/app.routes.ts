import { Routes } from '@angular/router';
import { Dashboard } from './features/dashboard/dashboard';
import { InvestmentFunds } from './features/investment-funds/investment-funds';
import { HistorialFunds } from './features/historial-funds/historial-funds';
import { Profile } from './features/profile/profile';

export const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  { path: 'investment-funds', component: InvestmentFunds},
  { path: 'history', component: HistorialFunds},
  { path: 'dashboard', component: Dashboard},
  { path: 'profile', component: Profile},
  { path: '**', redirectTo: ''}
];
