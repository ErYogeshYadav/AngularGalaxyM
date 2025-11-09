export const environment = {
    production: false,
    baseUrl: '',
    useHash: false,
    remotesManifestUrl : 'federation.manifest.json',
    remotes: {
        "todos": "http://localhost:4201/remoteEntry.json",
        "invoice": "http://localhost:4202/remoteEntry.json"
    }
};