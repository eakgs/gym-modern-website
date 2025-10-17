import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./ui/layout.component').then(m => m.LayoutComponent),
    children: [
      { path: '',         data: { animation: 'Home' },     loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent) },
      { path: 'programs', data: { animation: 'Programs' }, loadComponent: () => import('./features/programs/programs.component').then(m => m.ProgramsComponent) },
      { path: 'schedule', data: { animation: 'Schedule' }, loadComponent: () => import('./features/schedule/schedule.component').then(m => m.ScheduleComponent) },
      { path: 'pricing',  data: { animation: 'Pricing' },  loadComponent: () => import('./features/pricing/pricing.component').then(m => m.PricingComponent) },
      { path: 'shop',     data: { animation: 'Shop' },     loadComponent: () => import('./features/shop/shop.component').then(m => m.ShopComponent) },
      { path: 'signin',   data: { animation: 'SignIn' },   loadComponent: () => import('./features/auth/sign-in.component').then(m => m.SignInComponent) },
      { path: 'signup',   data: { animation: 'SignUp' },   loadComponent: () => import('./features/auth/sign-up.component').then(m => m.SignUpComponent) },
      { path: 'account',  data: { animation: 'Account' },  loadComponent: () => import('./features/account/account.component').then(m => m.AccountComponent) },
      { path: '**',       data: { animation: 'NotFound' }, loadComponent: () => import('./features/not-found/not-found.component').then(m => m.NotFoundComponent) },
    ]
  }
];
