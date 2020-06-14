import {ModuleWithProviders} from '@angular/core'
import {Routes, RouterModule} from '@angular/router'

import { AcquisitionComponent } from './components/acquisition/acquisition.component';
import {CreateComponent} from './components/create/create.component';

const appRoutes: Routes = [
  {path: '', component: AcquisitionComponent},
  {path: 'crear', component: CreateComponent}
];
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
