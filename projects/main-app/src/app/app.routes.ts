import { loadRemoteModule } from '@angular-architects/native-federation';
import { Routes } from '@angular/router';
import { environment } from '../environments/environment';

export const routes: Routes = [
    // {
    //     path: '',
    //     component: HomeComponent,
    //     pathMatch: 'full'
    // },
    {
        path: 'todos',
        loadComponent: () => loadRemoteModule('todos', './Component').then((m) => m.App),
        loadChildren: () => loadRemoteModule('todos', './routes').then((m) => m.routes),
    },
    {
        path: 'invoice',
        loadComponent: () => loadRemoteModule('invoice', './Component').then((m) => m.App),
        loadChildren: () => loadRemoteModule('invoice', './routes').then((m) => m.routes),
    },
    {
        path: 'invoices',
        loadComponent: () => loadRemoteModule({
            remoteEntry: environment.remotes.invoice,
            remoteName: 'invoice',
            exposedModule: './Component'
        }).then((m) => m.App),
        loadChildren: () => loadRemoteModule({
            remoteEntry: environment.remotes.invoice,
            remoteName: 'invoice',
            exposedModule: './routes'
        }).then(m => m.routes)
    },
    // {
    //     path: '**',
    //     component: HomeComponent,
    // },
];
