import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'form',
    loadChildren: () =>
      import('@form/feature/form-shell/form-shell.module').then(
        m => m.FormShellModule
      ),
    title: 'Form',
    data: {
      animation: 'formPage'
    }
  },
  {
    path: '**',
    redirectTo: '/form/builder',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
