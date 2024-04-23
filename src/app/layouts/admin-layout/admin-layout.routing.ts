import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { UserComponent } from 'src/app/pages/user/user.component';
import { ClientsComponent } from 'src/app/pages/clients/clients.component';
import { ServicesComponent } from 'src/app/pages/services/services.component';
import { OrdersComponent } from 'src/app/pages/orders/orders.component';
import { PrestatairesComponent } from 'src/app/pages/prestataires/prestataires.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'services',      component: ServicesComponent },
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'users',           component: UserComponent },
    { path: 'client',           component: ClientsComponent },
    { path: 'reservations',           component: OrdersComponent },
    { path: 'prestataires',           component: PrestatairesComponent },
    
];
