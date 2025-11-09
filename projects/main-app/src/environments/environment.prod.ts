export const environment = {
    production: true,
    baseUrl: '',
    useHash: false,
    remotesManifestUrl : 'federation.manifest.prod.json',
    remotes: {
        "todos": "http://localhost:4201/remoteEntry.json",
        "invoice": "http://localhost:4202/remoteEntry.json"
    }
};