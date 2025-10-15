import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '',              title: 'NeonFit · Home',     loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent) },
  { path: 'programs',      title: 'Programs · NeonFit', loadComponent: () => import('./features/programs/programs.component').then(m => m.ProgramsComponent) },
  { path: 'schedule',      title: 'Schedule · NeonFit', loadComponent: () => import('./features/schedule/schedule.component').then(m => m.ScheduleComponent) },
  { path: 'coach',         title: 'AI Coach · NeonFit', loadComponent: () => import('./features/coach/coach.component').then(m => m.CoachComponent) },
  { path: 'pricing',       title: 'Pricing · NeonFit',  loadComponent: () => import('./features/pricing/pricing.component').then(m => m.PricingComponent) },
  { path: 'shop',          title: 'Shop · NeonFit',     loadComponent: () => import('./features/shop/shop.component').then(m => m.ShopComponent) },
//   { path: 'about',         title: 'About · NeonFit',    loadComponent: () => import('./features/about/about.component').then(m => m.AboutComponent) },
//   { path: 'contact',       title: 'Contact · NeonFit',  loadComponent: () => import('./features/contact/contact.component').then(m => m.ContactComponent) },
//   { path: '**',            title: 'Not found · NeonFit',loadComponent: () => import('./features/not-found/not-found.component').then(m => m.NotFoundComponent) },
];
