import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { AuthGuard } from '../../shared/auth/auth.guard';
import { SearchComponent } from './pages/search/search.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'search', component: SearchComponent },
      {
        path: 'favorites',
        component: FavoritesComponent,
        canActivate: [AuthGuard],
      },
      {
        path: '**',
        redirectTo: 'search',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
