import { InjectionToken } from '@angular/core';
export interface Env { apiBase: string; }
export const ENV = new InjectionToken<Env>('ENV');