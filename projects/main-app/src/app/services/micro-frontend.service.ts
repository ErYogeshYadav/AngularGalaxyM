import { loadRemoteModule } from "@angular-architects/native-federation";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class MicroFrontendService {
    constructor() { }
    async loadMicroFrontend(port: string, remoteName: string){
        // Logic to load micro-frontend dynamically
        try {
            return await loadRemoteModule({
                remoteEntry: port,
                remoteName: remoteName,
                exposedModule: './Component',
                fallback: 'unauthorized'
            })
        } catch (err) {
            console.error('Error loading micro-frontend:', err);
            throw err;
        }
        // This could involve loading scripts, styles, and bootstrapping the micro-frontend
    }
}