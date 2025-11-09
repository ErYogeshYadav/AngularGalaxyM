# AngularGalaxyM

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.9.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.



ng new AngularGalaxyM --create-application=false
cd AngularGalaxyM

ng g application MainApp  
ng g application Todos   
ng g application Invoice   

npm i -D @angular-architects/native-federation    

ng g @angular-architects/native-federation:init --project MainApp --port 4200 --type dynamic-host
ng g @angular-architects/native-federation:init --project Todos --port 4201 --type remote
ng g @angular-architects/native-federation:init --project Invoice --port 4201 --type remote


## Federation Manifest Configuration
## The federation.manifest.json file, located in the shell's assets folder, lists all remote micro frontends and their entry points:

{
	"todos": "http://localhost:4201/remoteEntry.json",
	"invoice": "http://localhost:4202/remoteEntry.json"
}


## ng g @angular-architects/native-federation:init --project Todos --port 4201 --type remote

Remote Federation Configuration
The federation.config.js file in the remote application specifies which components or modules to expose:



## change main.ts file in main app 
initFederation(environment.remotes)
  .catch(err => console.error(err))
  .then(_ => import('./bootstrap'))
  .catch(err => console.error(err));


## create an environment dev and prod file an add a remotes 
    remotes: {
        "todos": "http://localhost:4201/remoteEntry.json",
        "invoice": "http://localhost:4202/remoteEntry.json"
    }

## change in routes in main app 


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


